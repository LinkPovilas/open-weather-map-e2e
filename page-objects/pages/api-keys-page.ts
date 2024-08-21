import type { NavigationBar } from 'page-objects/components/navigation/navigation-bar';
import type { ApiKeyForm } from 'page-objects/components/api-key/api-key-form';
import type { ApiKeyTable } from 'page-objects/components/api-key/api-key-table';
import type { EditApiKeyModal } from 'page-objects/components/api-key/edit-api-key-modal';

export class ApiKeysPage {
  constructor(
    readonly navigationBar: NavigationBar,
    readonly apiKeyForm: ApiKeyForm,
    readonly apiKeyTable: ApiKeyTable,
    readonly editApiKeyModal: EditApiKeyModal
  ) {}
}
