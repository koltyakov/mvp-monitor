Function Print-InfoMessage($message) {
  Write-Host -Foregroundcolor Cyan $message
}

Function Print-SuccessMessage($message) {
  Write-Host -Foregroundcolor Green $message;
}

Function Print-WarningMessage($message) {
  Write-Host -Foregroundcolor Yellow $message;
}

Function Print-ErrorMessage($message) {
  Write-Host -Foregroundcolor Red "";
  Write-Host -Foregroundcolor Red "There was an error running the script. ";
  Write-Host -Foregroundcolor Red $message;
  Write-Host -Foregroundcolor Red "";
}

Function Install-CustomModule {
  [CmdletBinding()]

  param (
    [Parameter(Mandatory=$True)]
    [string] $PsModuleName
  );

  Process {
    $modules = Get-Module -Name $PsModuleName -ListAvailable;
    If ($null -eq $modules) {
      # Remove other PnP Versiong if it is PnP module
      If ($PsModuleName.Contains("SharePointPnPPowerShell")) {
        $rmod = Get-Module -Name SharePointPnPPowerShell* -ListAvailable;
        If ($null -ne $rmod) {
          Remove-Module -ModuleInfo $rmod -Force;
          Uninstall-Module -Name $rmod.Name;
        }
      }
      Install-Module -Name $PsModuleName -Scope CurrentUser -Force;
      Import-Module -Name $PsModuleName -DisableNameChecking;
    }
  }
}

Function Upgrade-CustomModule {
  [CmdletBinding()]

  param (
    [Parameter(Mandatory=$True)]
    [string] $PsModuleName
  );

  Process {
    $modules = Get-Module -Name $PsModuleName -ListAvailable;
    If ($null -eq $modules) {
      # Remove other PnP Versiong if it is PnP module
      If ($PsModuleName.Contains("SharePointPnPPowerShell")) {
        $rmod = Get-Module -Name SharePointPnPPowerShell* -ListAvailable;
        If ($null -ne $rmod) {
          Remove-Module -ModuleInfo $rmod -Force;
          Uninstall-Module -Name $rmod.Name;
        }
      }
      Install-Module -Name $PsModuleName -Scope CurrentUser -Force;
      Import-Module -Name $PsModuleName -DisableNameChecking;
    }
  }
}