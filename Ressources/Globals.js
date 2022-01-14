export default {
  USER_TYPE: 0,
  PROCESS_STATE: {},
  PROFIL_INFO: {},
  INTERNET: true,
  worker: {downloadContent: {}, modalcontent: ''},
  IMAGES: {
    SPLASH: require('../assets/splash.png'),
    LOGO: require('../Images/logo.png'),
  },
  FONTS: {
    Montserrat_LightItalic: require('../assets/fonts/Montserrat-LightItalic.ttf'),
  },
  COLORS: {
    primary: '#f4440cff',
    secondary: '#204b9bff',
    primary_pure: '#f4440cff',
    accent: '#50c878',
    background: '#f7f9fb',
    co_gris: '#dbe3de',
    pur_green: '#445500',
    light_green: '#d7f4e3',
    light_blue: '#29B2FE',
    black: '#000000',
    white: '#ffffff',
    aliceblue: '#fa9bd921',
    truealiceblue: '#F0F8FF',
    red: '#F44336',
    pink: '#E91E63',
    purple: '#9C27B0',
    deep_purple: '#673AB7',
    indigo: '#3F51B5',
    blue: '#2196F3',
    cyan: '#00BCD4',
    teal: '#009688',
    green: '#4CAF50',
    lime: '#CDDC39',
    yellow: '#FFEB3B',
    yellow_pure: '#F4C150',
    amber: '#FFC107',
    orange: '#FF9800',
    deep_orange: '#FF5722',
    brown: '#795548',
    grey: '#9E9E9E',
    blue_grey: '#607D8B',
    light_grey: '#eceff5',
    blue_dark: '#23233cff',
    cerulean: '#007791',
    arsenic: '#393f4a',
    arsenic2: '#535e72ff',
  },
  STRINGS: {
    welcome: 'Bienvenue !',
    get_started: 'commençons au tout debut !',
    save: 'ENREGISTRÉS',
    checked: 'VALIDÉS',
    earned: 'GAINS',
    rejected: 'REJETÉS',
    checkout: 'Encaisser',
    signout: 'Déconnecter',
    newHere: 'Vous êtes nouveau ici ?',
    alreadyRegistered: 'Vous avez déjà un compte ? ',
    password_forgot: 'mot de passe oublié ?',
    parcourrir: 'Parcourir',
    terms_declaration: 'En utilisant nos services, vous acceptez nos ',
    register: 'Inscrivez Vous !',
    and: 'et',
    students: 'Elèves',
    connect: 'Se Connecter',
    connection: 'Connexion',
    Ocurred_error: 'An error occured',
    inscription: 'Inscription',
    rate: 'Note',
    firstname: 'Nom',
    lastname: 'prénom',
    username: "Nom d'utilisateur",
    mail: 'Addresse E-mail',
    phone: 'Numéro de Téléphone',
    code_not_received: "Je n'ai pas reçu",
    address: 'Addresse',
    password: 'Mot de passe',
    new_pass: 'Nouveau Mot de passe',
    confirm_password: 'Confirmer mot de passe ',
    old_password: 'ancien mot de passe ',
    profession: 'Profession',
    security: 'Sécurité',
    language: 'Language',
    Profil: 'Profil',
    courses: 'Cours',
    my_courses: 'Mes Cours',
    you_are_fowing: 'Vous suivez ',
    account: 'Compte',
    Favorites: 'Favoris',
    retry: 'Réessayez',
    MyStudent: 'Mes Elèves',
    Code: 'Clé de commande',
    BoardControl: 'Tableau de bord',
    Notification: 'Notification',
    Display: 'Affichage',
    SearchesDevis: 'Avis de recherche',
    Mylessons: 'Mes Leçons',
    Evaluation: 'Evaluation',
    DemandSpace: 'Espace demande',
    Search: 'Rechercher',
    Parameter: 'Paramètre',
    modify: 'modifier',
    suceffully_copied: 'Contenu copié dans la presse-papier avec succès',
    suceffully_delete: 'Note Supprimmé avec succès',
    suceffully_modify: 'Modifications enregistré',
    copy: 'copier',
    delete: 'supprimer',
    confirm_delete: 'Voulez-vous vraiment supprimer cette note ?',
    position: 'position',
    show_notification: 'Afficher les notifications',
    Transactions: 'Transactions',
    to: 'A',
    terms_and_conditions: 'Conditions générale d’utilisation',
    terms_and_conditions_formator: 'Condition d’utilisation du formateur ',
    average: 'Moyenne',
    seeMore: 'Voir Plus',
    see_mine: 'Voir moins',
    validate: 'Valider',
    state: 'Etat',
    cancel: 'Annuler',
    age: 'Age',
    signal: 'Signaler',
    my_data: 'Mes données',
    submit: 'Soumettre',
    validating: 'En attente de validation',
    validated: 'Validé',
    from: 'De',
    logout: 'Déconnexion',
    About: 'A Propos',
    Commands: 'Commandes',
    no_internet: '🛸 Pas de connexion Internet !',
    best_in_categorie: 'Meilleur cours dans les catégories',
    our_bests: 'Nos meilleures sélections',
    categories: 'Catégories',
    downloads: 'Téléchargements',
    home: 'Accueil',
    a_lafiche: "Cours à l'affiche",
    all_courses: 'Tous les cours',
    unknow_error: 'Une petite eurreur est survenu 😞',
    particicpant: 'Participants',
    formator_note: 'Notes globales du formateur',
    avis: 'Avis',
    more_section: 'sections supplémentaires',
    study_program: "Programme d'études",
    pre_requis: 'Prérequis',
    description: 'Description',
    link: 'Lien personel',
    will_learn: 'Ce que vous apprendrez',
    course_includes: 'Ce cours comprend',
    add_favorite: 'Ajouter aux favoris',
    remove_favorite: 'enlever des favoris',
    remove_download: 'enlever des Télechargements',
    add_cart: 'Ajouter au pannier',
    remove_cart: 'Enlever du pannier',
    explore_cart: 'Voir le Pannier',
    checkout_now: 'Acheter dès maintenant',
    begin_tolearn: 'Commencer à Suivre',
    maj_to: 'Mise à jour le ',
    created_by: 'Crée par ',
    hours: 'heures',
    available_all: 'Disponible sur mobile, ordinateur de bureau et télévision',
    available_certificate: 'Certificat de validation',
    ilimity_acces: 'Acces ilimité à vie',
    support_file: 'Fichier de support',
    see_profil: 'Voir le profil',
    participant_comment: 'Conmentaires des participants',
    more_comment: 'Plus de commentaires',
    also_visited: 'Les participants ont également consulté',
    instructor: 'Instructeur',
    display_all: 'Afficher tout',
    personal_informations: 'Information personelles',
    display_name: 'Nom public',
    total_participants: 'Nombre total de participants',
    search: 'Rechercher',
    parcour_category: 'Parcourir les catégories',
    course_here: 'aucun cour suivit  ! Vos cours apparaîtrons ici !',
    no_course_fav:
      'aucun cour dans les favoris ! Vos preférés apparaîtrons ici !',
    hello: 'Bienvenu',
    already_use_exist:
      "Ce nom d'utilisateur est déjà pris 😞. Veillez en choisir un autre !",
    incorrect_pass: 'Mot de passe incorrect 😞!',
    inexistan_user: 'Utilisateur introuvable 😞!',
    display_text_version: 'Aficher plus',
    terminated: 'terminés',
    current_balance: 'solde courant',
    student_profil: 'Profil Etudiant',
    quizzes: 'quizzes result',
    certificates: 'certificats',
    other: 'autre',
    atelier: 'Learning',
    general: 'general',
    date: 'date',
    evolution_state: "Etat d'avancement",
    interval: 'Intervalle',
    total: 'Total',
    deconnexion: 'se déconnecter',
    sur_deconnect: 'Voulez-vous déconnecter de Sedami ?',
    confirm_modification_cancel: 'Voulez-vous annuler les modifications ?',
    faq: 'Foire aux questions',
    share: 'Partager',
    not_connected: 'Connectez-vous pour vous inscrire à ce cours.',
    continu_reading: 'Continuer la lecture !',
    sessions: 'Sessions',
    about_course: 'A propos de ce cour',
    share_course: 'Partager ce cour',
    download_course: 'Télécharger ce cour',
    remarques: 'Remarques',
    annonces: 'Annonces',
    archive: 'Archiver ce cour',
    start_download: 'début Télechargement',
    confirm_download: 'Taille du Télechargemen : ',
    alreadyremember: 'Vous vous en souvenez ? ',
    GetCode: 'reinitialliser',
    empty_notes: 'Aucune notes',
    notedit_placeholder: "Garder toujours à l'esprit le travail !",
    likes_courses: 'Listes de Favoris !',
    explore: 'Explorer',
    check_con_retry:
      'Erreur de telechargement . verifiez votre connexion et reésayez',
    sucess_Update: `Mise à jour reuissi`,
  },
  ARRAYS: {
    text_arr: [
      `Suivez des cours au format video/--/Nous sommes la combinaison de passion, vision, expertise et d’expérience.`,
      `Des formateurs competents/--/La première place de marché pour l'apprentissage et la formation depuis l’Afrique.`,
      `Suivez votre propre rythme/--/Bénéficiez d'un accès illimité à vos cours. Consultez-les à tous moment, quel que soit le lieu où vous vous trouvez`,
    ],
  },
};
