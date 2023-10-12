provider "azurerm" {
 features {}
}

locals {
  vaultName = "${var.product}-kv-${var.env}"
}

data "azurerm_key_vault" "key_vault" {
  name = local.vaultName
  resource_group_name = "${var.product}-${var.env}"
}

module "fis-ds-update-session-storage" {
  source   = "git@github.com:hmcts/cnp-module-redis?ref=master"
  product  = "${var.product}-${var.component}-${var.env}"
  location = var.location
  env      = var.env
  common_tags  = var.common_tags
  private_endpoint_enabled = true
  redis_version = "6"
  business_area = "cft"
  public_network_access_enabled = false
}

resource "azurerm_key_vault_secret" "redis_access_key_v6" {
  name         = "redis-access-key-v6"
  value        = module.fis-ds-update-session-storage.access_key
  key_vault_id = data.azurerm_key_vault.key_vault.id
}
