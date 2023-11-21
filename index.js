import { TwitterApi } from 'twitter-api-v2';

const phrases = {
  'daily-standup-executioner': [
    'Bora pra Daily, time?',
    'Todo mundo preparado pra daily?',
    'Aquele momento ótimo do dia! Vamos alinhar na nossa daily!',
    'Opa time, bora fazer a nossa reunião diária!?',
    'É isso galera, temos uma daily?',
  ],
  'daily-align-executioner': [
    'Eae pessoal! Como estamos?',
    'Fala galerinha! Algum impedimento?',
    'Opa gente! Tudo dentro pra entregarmos o projeto?',
    'Alow time! Me apertaram na reunião hoje e tive que prometer uma redução dos prazos aí 😞',
    'Vamos marcar um refinamento?',
    'Pessoal não vamos ter tempo para refinar as historias',
    'Não dá pra quebrar essa task em duas?',
    'Será que a gente não consegue quebrar essa task em tipo... umas seis?',
    'Pessoal, dá pra puxar algo mais do backlog pra sprint?',
    'Posso gerar a versão?',
    'Vamos tentar fechar todas as tasks hoje! Tão comigo, pessoal?',
    'Não esquece de preencher o "Forms" do termômetro do time hein galera',
    'Putz galera, alguém andou fazendo update em produção?',
  ],
  'weekly-email-executioner': ['Pessoal, recebi um email aqui do time de produto'],
  'weekly-sprint-executioner': ['Pessoal, bora fazer nossa sprint semanal?'],
  'every-five-minutes-executioner': ['Quem mandou um push de teste em produção? 😡'],
};

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET_KEY,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const shuffle = (array) => {
  const copy = [...array];
  const { length } = copy;

  for (let i = length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
};

// eslint-disable-next-line import/prefer-default-export
export const handler = async (executioner) => {
  let result;

  try {
    console.info('EVENT:', JSON.stringify(executioner, null, 2));
    const { resources: [resource] } = executioner;
    const matches = [];
    resource.replace(/arn:aws:events:[a-zA-Z0-9-]+:[0-9]+:rule\/(.+)$/g, (_, match) => matches.push(match));
    const [key] = matches;
    console.info(`KEY: ${key}`);
    const [status] = shuffle(phrases[key]);
    console.info(`SELECTED PHRASE: ${status}`);
    console.time('POST EXECUTION');
    result = await client.v2.tweet(status);
    console.timeEnd('POST EXECUTION');
    console.info('TWITTER API RESULT:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.trace(error);
    return error;
  }

  return result;
};
