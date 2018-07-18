import React from 'react'
import { Redirect } from 'react-router'

import BetaPage from '../components/pages/BetaPage'
import BookingsPage from '../components/pages/BookingsPage'
import DiscoveryPage from '../components/pages/DiscoveryPage'
import FavoritesPage from '../components/pages/FavoritesPage'
import InventoryPage from '../components/pages/InventoryPage'
import ProfilePage from '../components/pages/ProfilePage'
import SigninPage from '../components/pages/SigninPage'
import SignupPage from '../components/pages/SignupPage'
import TermsPage from '../components/pages/TermsPage'

export const getDiscoveryPath = (recommendation, toVerso = false) => {
  let url = '/decouverte/'
  if (recommendation.mediation) {
      if (recommendation.mediation.tutoIndex !== null ) {
        url += `tuto/${recommendation.mediationId}`
      } else if (recommendation.mediation.thingId) {
        url += `o/${recommendation.mediation.thingId}/${recommendation.mediationId}`
      } else if (recommendation.mediation.eventId) {
        url += `e/${recommendation.mediation.eventId}/${recommendation.mediationId}`
      }
  } else if (recommendation.thingId) {
      url += `o/${recommendation.thingId}`
  } else if (recommendation.eventId) {
      url += `e/${recommendation.eventId}`
  }
  if (toVerso) {
    url += "?to=verso"
  }
  return url
}

const routes = [
  {
    exact: true,
    path: '/',
    render: () => <Redirect to="/beta" />,
  },
  {
    exact: true,
    path: '/beta',
    title: "Bienvenue dans l'avant-première du Pass Culture",
    render: () => <BetaPage />,
  },
  {
    exact: true,
    path: '/connexion',
    title: 'Connexion',
    render: () => <SigninPage />,
  },
  {
    exact: true,
    path: '/inscription',
    title: 'Inscription',
    render: () => <SignupPage />,
  },
  {
    exact: true,
    path: '/decouverte',
    render: () => <DiscoveryPage />,
  },
  ,
  {
    exact: true,
    path: '/decouverte/:occasionTypeAbbr/:occasionId/:mediationId?',
    title: 'Les offres',
    render: ({
      match: {
        params: { occasionTypeAbbr, mediationId, occasionId },
      },
    }) => <DiscoveryPage mediationId={mediationId} occasionId={occasionId} occasionTypeAbbr={occasionTypeAbbr} />,
  },
  {
    exact: true,
    path: '/favoris',
    title: 'Mes favoris',
    render: () => <FavoritesPage />,
  },
  {
    exact: true,
    path: '/inventaire',
    title: 'Inventaire',
    render: () => <InventoryPage />,
  },
  {
    exact: true,
    path: '/profil',
    title: 'Profil',
    render: () => <ProfilePage />,
  },
  {
    exact: true,
    path: '/reservations',
    title: 'Réservations',
    render: () => <BookingsPage />,
  },
  {
    exact: true,
    path: '/mentions-legales',
    title: 'Mentions Légales',
    render: () => <TermsPage />,
  },
]

export default routes
