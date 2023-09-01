/* eslint-disable no-useless-escape */
export const patterns = {
  text: [
    { label: 'E-mails', value: '^[w-.]+@([w-]+.)+[w-]{2,4}$' },
    {
      label: 'URL',
      value: '^https?://(?:www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$'
    }
  ],
  number: {}
};
