const axios = require('axios');


const getCampaignData = async () => {try {
    const response = await axios.get(
      'http://avantisales.geniussuite.com.br/api/campaigns/11',
      {
        headers: {
          'Content-Type': 'application/json'
        },
        auth: {
          username: username,
          password: password
        }
      }
    );
    // console.log('Resposta da API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar a campanha:', error.message);
  }
};

module.exports = getCampaignData;

