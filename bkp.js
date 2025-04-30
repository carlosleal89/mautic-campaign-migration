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

      // Altera os ids do children do evento
      event.children.forEach((childEl) => {
        childEl.id = `new${childEl.id}`;

        // Altera o vendo do webhook de atualizar vitrines
        
        
        // childEl.children.forEach((childChild) => {
        //   childChild.id = `new${childChild.id}`;
        //   childChild.properties.jumpToEvent = `new${childChild.properties.jumpToEvent}`;   
        // });
      });
      
      // Altera os ids dos parent do evento
      // if(event.parent !== null) {
      //   event.parent.id = `new${event.parent.id}`
      // }
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