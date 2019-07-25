Function Get-SpAuthContext {
  [CmdletBinding()]

  param (
    [Parameter(Mandatory=$False)]
    [string] $Path = ".\config\private.json"
  );

  Process {
    Write-Host "Auth config locations:" $Path

    $Context = $null;

    $env:SPAUTH_ENV = "production"; # Prevent SPAuth interactive mode
    $SpAuthRead = ".\node_modules\.bin\sp-auth read -p ""$Path""";

    if (Test-Path $Path) {

      # Write-Host $SpAuthRead;

      $Context = Invoke-Expression $SpAuthRead | ConvertFrom-Json;

      $AppId = $Context.authOptions.clientId;
      if ($null -ne $AppId)
      {
        $AppSecret = $Context.authOptions.clientSecret;
        $Context | Add-Member -NotePropertyName AppId -NotePropertyValue $AppId;
        $Context | Add-Member -NotePropertyName AppSecret -NotePropertyValue $AppSecret;
      }

      $Username = $Context.authOptions.username;
      if ($null -ne $Username)
      {
        $Password = $Context.authOptions.password;
        $secPassword = ConvertTo-SecureString -String $Password -AsPlainText -Force;
        $Credentials = New-Object System.Management.Automation.PSCredential ($Username, $secPassword);
        $Context | Add-Member -NotePropertyName Credentials -NotePropertyValue $Credentials;
      }

      $TenantHostUrl = ([System.Uri]$Context.siteUrl).Scheme + "://" + ([System.Uri]$Context.siteUrl).IdnHost;
      $TenantAdminUrl = $TenantHostUrl.Replace(".sharepoint.com", "-admin.sharepoint.com");

      $Context | Add-Member -NotePropertyName TenantHostUrl -NotePropertyValue $TenantHostUrl;
      $Context | Add-Member -NotePropertyName TenantAdminUrl -NotePropertyValue $TenantAdminUrl;
    }

    $Context;
  }
}

Function Get-SpConnection {
  [CmdletBinding()]

  param (
    [Parameter(Mandatory=$True)]
    [string] $Url,
    [Parameter(Mandatory=$True)]
    [PSObject] $Context
  );

  Process {
    if ($null -ne $Context.Credentials)
    {
      $Connection = Connect-PnPOnline -Url $Url -Credentials $Context.Credentials -ReturnConnection;
    }

    if ($null -ne $Context.AppId)
    {
      $Connection = Connect-PnPOnline -Url $Url -AppId $Context.AppId -AppSecret $Context.AppSecret -ReturnConnection;
    }

    if ($null -eq $Connection)
    {
      $Connection = Connect-PnPOnline -Url $Url -UseWebLogin -ReturnConnection;
    }

    $Connection;
  }
}