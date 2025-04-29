const existingCampaign = require('./data.json');
require('dotenv').config();

const allowedKeys = [
  'isPublished', 'name', 'description', 'allowRestart', 'events', 'forms', 'lists', 'canvasSettings'
];

const formatJson = (json) => {
  const formattedJson = {};

  for (const key in json) {
    if (allowedKeys.includes(key)) {
      formattedJson[key] = json[key];
    }
  }
  return formattedJson;
}

let formattedCampaign = formatJson(existingCampaign.campaign);

const formatCampaignIds = (campaignJson) => {  
  if (campaignJson.events) {
    campaignJson.events.forEach((event) => {
      // Altera o id do evento
      event.id = `new${event.id}`

      // Altera os ids do children do evento
      event.children.forEach((child) => {
        child.id = `new${child.id}`        
      });
      
      // Altera os ids dos parent do evento
      if(event.parent !== null) {
        event.parent.id = `new${event.parent.id}`
      }
    });
  }

  if (campaignJson.canvasSettings) {
    campaignJson.canvasSettings.nodes.forEach((nodeEl) => {
      if (/^\d+$/.test(nodeEl.id)) {  // Verifica se o id é composto apenas por dígitos
        nodeEl.id = `new${nodeEl.id}`;
      }
    });    
  }

  if (campaignJson.canvasSettings) {
    campaignJson.canvasSettings.nodes.forEach((nodeEl) => {
      if (/^\d+$/.test(nodeEl.id)) {
        nodeEl.id = `new${nodeEl.id}`;
      }
    });
    
    campaignJson.canvasSettings.connections.forEach((connectionEl) => {
      if (/^\d+$/.test(connectionEl.sourceId)) {
        connectionEl.sourceId = `new${connectionEl.sourceId}`;
      }

      if (/^\d+$/.test(connectionEl.targetId)) {
        connectionEl.targetId = `new${connectionEl.targetId}`;
      }
    }); 
  }
}

formatCampaignIds(formattedCampaign);

// console.log(formattedCampaign);

const axios = require('axios');

const postCampaignData = async () => {
  const username = process.env.SOURCE_MAUTIC_USER;
  const password = process.env.SOURCE_MAUTIC_PASSWORD;

  try {
    const response = await axios.post(
      'http://avantisales.geniussuite.com.br/api/campaigns/new',
      formattedCampaign,
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
    console.log('Resposta da API:', response.data);
  } catch (error) {
    console.error('Erro ao enviar a campanha:', error.message);
  }
};

postCampaignData();

