Function Read-JsConfig {
  [CmdletBinding()]
  param (
    [Parameter(Mandatory=$True)]
    [string] $ConfigPath
  );

  Process {
    If ($ConfigPath.EndsWith(".js")) {
      $JSON = Invoke-Expression "node $PSScriptRoot\JsConfigs.js $((Get-Location).Path) $ConfigPath" | ConvertFrom-Json;
    }
    Else {
      $JSON = Get-Content $ConfigPath -Encoding UTF8 | ConvertFrom-Json;
    }
    $JSON;
  }
}
