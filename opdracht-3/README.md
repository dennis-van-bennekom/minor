# Single page web app voordelen en nadelen

## Voordelen
- **Live updates**: het kan makkelijker zijn om een applicatie te maken die data uit een API haalt en live updates geeft, zoals met Meteor.
- **Renderen:** als de data verandert kan je makkelijk opnieuw renderen zonder dat je een request hoeft te doen naar de server.
- **Instant feedback**: als de gebruiker bijvoorbeeld een comment post hoeft de pagina niet helemaal te reloaden maar kan je de comment er vast plaatsen en een request doen naar de API om de comment daadwerkelijk op te slaan.

## Nadelen
- **State:** je moet in de browser de status en data van je applicatie bijhouden, dit kan bijvoorbeeld met Flux, Reflux, Vuex etc. maar kan soms ingewikkeld zijn.
- **Javascript:** de bezoeker moet javascript aan hebben staan tenzij je server side rendering gebruikt.
- **Performance:** de browser moet templates renderen dit kan ten koste gaan van performance.