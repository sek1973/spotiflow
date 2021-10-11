import { SpotifyScopeEnum } from ".";

export interface AuthParamConfig {
  response_type: string;
  client_id: string;
  scope: SpotifyScopeEnum[];
  redirect_uri: string;
  state: string;
  show_dialog: boolean;
}
