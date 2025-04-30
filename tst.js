const formattedCampaign = items[0].json;

const formatCampaignIds = (campaignJson) => {  
  if (campaignJson.events) {
    campaignJson.events.forEach((event) => {
      // Altera o id do evento
      event.id = `new${event.id}`;

      // Altera os nós de jump to event
      event.properties.jumpToEvent = `new${      event.properties.jumpToEvent}`;

      if (event.properties.additional_data) {          event.properties.additional_data.list.forEach((listEl) => {
          if (listEl.label ===  'account') {
      //       //PRECISA ALTERAR ESSA PARTE PARA RECEBER O VALUE DE FORMA DINAMICA
            listEl.value = `new${listEl.value}`
          }
        })
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
      // Regex verifica se o id é composto por digitos
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

return [
  {
    json: formattedCampaign
  }
];