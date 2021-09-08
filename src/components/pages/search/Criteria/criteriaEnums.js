export const GEOLOCATION_CRITERIA = {
  EVERYWHERE: {
    label: 'Partout',
    icon: 'ico-everywhere',
    requiresGeolocation: false,
  },
  AROUND_ME: {
    label: 'Autour de moi',
    icon: 'ico-around-me',
    requiresGeolocation: true,
  },
}

export const CATEGORY_CRITERIA = {
  ALL: {
    label: 'Toutes les catégories',
    icon: 'ico-all',
    facetFilter: '',
  },
  CINEMA: {
    label: 'Cinéma',
    icon: 'ico-cinema',
    facetFilter: 'Cinéma',
  },
  EXHIBITION: {
    label: 'Visite, exposition',
    icon: 'ico-exposition',
    facetFilter: 'Visite, exposition',
  },
  MUSIC: {
    label: 'Musique',
    icon: 'ico-music',
    facetFilter: 'Musique',
  },
  SHOW: {
    label: 'Spectacles',
    icon: 'ico-show',
    facetFilter: 'Spectacles',
  },
  LESSON: {
    label: 'Cours, ateliers',
    icon: 'ico-arts',
    facetFilter: 'Cours, ateliers',
  },
  BOOK: {
    label: 'Livre',
    icon: 'ico-books',
    facetFilter: 'Livre',
  },
  FILM: {
    label: 'Films, séries',
    icon: 'ico-movie',
    facetFilter: 'Films, séries',
  },
  PRESS: {
    label: 'Presse, médias',
    icon: 'ico-newspaper',
    facetFilter: 'Presse, médias',
  },
  GAME: {
    label: 'Jeux',
    icon: 'ico-game',
    facetFilter: 'Jeux',
  },
  CONFERENCE: {
    label: 'Conférences, rencontres',
    icon: 'ico-conference',
    facetFilter: 'Conférences, rencontres',
  },
  INSTRUMENT: {
    label: 'Instruments de musique',
    icon: 'ico-instrument',
    facetFilter: 'Instruments de musique',
  },
  ART_SUPPLY: {
    label: 'Beaux-arts',
    icon: 'ico-materiel-creatif',
    facetFilter: 'Beaux-arts',
  },
}
