# Minor Web Development
## Web App From Scratch

[pages](http://dennis-van-bennekom.github.io/minor-web-app-from-scratch)

Hier zijn al mijn opdrachten voor dit vak te vinden.

# Opdracht 2
> Framework voordelen en nadelen

## Voordelen
- **Structuur:** een framework heeft vaak een vaste structuur die ervoor zorgt dat je daar niet over na hoeft te denken en een soort houvast hebt.
- **Community:** populaire frameworks hebben vaak een community waar je vragen kan stellen en hulp kan vragen. Vaak kan je vragen stellen op [stackoverflow](http://www.stackoverflow.com) of op de github [issues](https://github.com/vuejs/vue/issues).
- **Documentatie:** de meeste frameworks hebben een goede documentatie, zoals [Vue](http://vuejs.org/guide/), [React](http://facebook.github.io/react/docs/getting-started.html) en [Angular](https://angular.io/docs/ts/latest/). Hier kan je altijd veel informatie vinden als iets niet lukt.

**Bronnen:**
- [Redux best practises](https://medium.com/lexical-labs-engineering/redux-best-practices-64d59775802e#.8rikbs1jg)
- [React Documentatie](http://facebook.github.io/react/docs/getting-started.html)


## Nadelen
- **Leren:** elk framework moet je tijd in steken om te leren. Als je een kleine opdracht moet doen kan het zo zijn dat het de tijd niet waard is om een framework te leren.
- **Veranderingen:** als je een framework update zou het kunnen zijn dat er veranderingen zijn waardoor je je eigen code moet aanpassen, dit kan vervelend zijn in een groot project.
- **Bugs:** als er bugs zijn die te maken hebben met het framework kan het moeilijk zijn om die op te lossen als je de onderliggende code niet snapt.

**Bronnen:**
- [React Issues](https://github.com/facebook/react/issues)
- [Choosing the Right JavaScript Framework](https://www.lullabot.com/articles/choosing-the-right-javascript-framework-for-the-job)

# Opdracht 3
> Single page web app voordelen en nadelen

## Voordelen
- **Live updates**: het kan makkelijker zijn om een applicatie te maken die data uit een API haalt en live updates geeft, zoals met Meteor.
- **Renderen:** als de data verandert kan je makkelijk opnieuw renderen zonder dat je een request hoeft te doen naar de server.
- **Instant feedback**: als de gebruiker bijvoorbeeld een comment post hoeft de pagina niet helemaal te reloaden maar kan je de comment er vast plaatsen en een request doen naar de API om de comment daadwerkelijk op te slaan.

**Bronnen:**
- [7 Reasons to Develop Your Next Web App with Meteor](http://www.sitepoint.com/7-reasons-develop-next-web-app-meteor/)
- [React advanced performance](https://facebook.github.io/react/docs/advanced-performance.html)

## Nadelen
- **State:** je moet in de browser de status en data van je applicatie bijhouden, dit kan bijvoorbeeld met Flux, Reflux, Vuex etc. maar kan soms ingewikkeld zijn.
- **Javascript:** de bezoeker moet javascript aan hebben staan tenzij je server side rendering gebruikt.
- **Performance:** de browser moet templates renderen dit kan ten koste gaan van performance.

**Bronnen:**
- [React Redux](https://github.com/rackt/redux)
- [Javascript Fatigue](https://medium.com/@ericclemmons/javascript-fatigue-48d4011b6fc4#.epy77ap2f)