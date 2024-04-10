import { FormControl, FormGroup, Validators } from "@angular/forms";

export const createMessageForm = () =>
  new FormGroup({
    message: new FormControl('', Validators.required),
  });

export type MessageFormType = ReturnType<typeof createMessageForm>;

export type MessageFormValue = Required<MessageFormType['value']>;