import axios from 'axios';

const client = axios.create({
  baseURL: 'https://raw.githubusercontent.com/tldr-pages/tldr/main/pages/',
});


export const getTldr = async (command: string): Promise<string> => {
  return client.get<string>(`common/${command}.md`)
    .catch(() => client.get<string>(`linux/${command}.md`))
    .catch(() => client.get<string>(`windows/${command}.md`))
    .catch(() => client.get<string>(`android/${command}.md`))
    .then(res => res.data)
    .catch(() => {
      return 'Not found';
    });
};
