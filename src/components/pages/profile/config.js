import { getDepartementByCode } from '../../../helpers'
// formulaires pour les vues décorées par le HOC withProfileForm
import ProfileIdentifiantForm from './forms/ProfileIdentifiantForm'
import ProfilePasswordForm from './forms/ProfilePasswordForm'

/**
 * Exemple d'un objet de configuration
 * ---------
 * FormComponent [Node]   Composant react affiche par la route
 * editable [Boolean]     Si le bouton dans la vue MainView est cliquable
 * initialValues [Object] Valeur par défaut du formulaire
 *                        Sinon c'est la valeur de l'objet `user`
 *                        qui sera utilisée
 * key [String|Array]     La clé de la valeur sur l'object `user`
 *                        Pour afficher dans la vue MesInformations
 *                        Si le `resolver` est défini c'est la valeur
 *                        la valeur de retour qui sera utilisée
 * label [String]         Utilisé pour affiché le label au dessus des inputs
 *                        Dans un formulaire
 *                        ou dans le corps de la page success
 * resolver [Function]    Retourne une valeur de la vue MesInformations
 * routeName [String]     Label d'une bouton de la vue MesInformations
 * title: [String]        Titre dans le PageHeader d'une page d'édition
 *                        ou pour le titre la page success
 */
// on utilise un array d'objects pour garder l'ordre d'affichage
// dans la vue MesInformations, plus simple que de rajouter une propriété order
export const profileFields = [
  {
    FormComponent: ProfileIdentifiantForm,
    editable: true,
    initialValues: null,
    key: 'publicName',
    label: 'Identifiant',
    resolver: null,
    routeName: 'identifiant',
    title: 'Votre identifiant',
    validator: null,
  },
  {
    FormComponent: null,
    editable: false,
    initialValues: null,
    key: ['firstName', 'lastName'],
    label: 'Nom et prénom',
    placeholder: 'Renseigner mon nom et prénom',
    resolver: (user, key) => {
      const [keyFirstname, keyLastname] = key
      return [user[keyFirstname] || false, user[keyLastname] || false]
        .filter(v => v)
        .join(' ')
    },
    routeName: false,
    title: 'Votre nom et prénom',
    validator: null,
  },
  {
    FormComponent: null,
    editable: false,
    initialValues: null,
    key: 'email',
    label: 'Adresse e-mail',
    resolver: null,
    routeName: false,
    title: 'Votre adresse e-mail',
    validator: null,
  },
  {
    FormComponent: ProfilePasswordForm,
    editable: true,
    initialValues: {
      newPassword: null,
      newPasswordConfirm: null,
      oldPassword: null,
    },
    key: 'password',
    label: 'Mot de passe',
    placeholder: 'Changer mon mot de passe',
    resolver: () => false,
    routeName: 'mot-de-passe',
    title: 'Votre mot de passe',
    validator: null,
  },
  {
    FormComponent: null,
    editable: false,
    initialValues: null,
    key: 'departementCode',
    label: 'Département de résidence',
    resolver: (user, key) => {
      const code = user[key]
      const deptname = getDepartementByCode(code)
      return `${code} - ${deptname}`
    },
    routeName: false,
    title: 'Votre Département de résidence',
    validator: null,
  },
]

// cree une copie du tableau config
// en gardant l'ordre defini pour l'affichage
// de la liste de boutons de la vue MesInformations
export const getOrderedFields = () => profileFields.slice(0)

/**
 * Cree une map d'object a partir
 * de la clé routeName
 */
export const getRoutesConfigObject = () => {
  // on garde uniquement les objets qui ont un component
  const components = profileFields.filter(
    o => o.editable && o.routeName && o.FormComponent
  )
  // creation d'un objet a partir de la cle d'objet `routeName`
  const routes = components.reduce(
    (acc, o) => ({ ...acc, [o.routeName]: o }),
    {}
  )
  return routes
}
