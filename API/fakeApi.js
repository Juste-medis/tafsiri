import Neter from '../Ressources/Neter';
const baseUrl = Neter.uri1;

let Fetcher = {
  GetSection: async function (setdada) {
    const result = await new Promise(resolve => {
      setTimeout(() => {
        resolve({
          trancriptarr: [
            'Il s’est agrippé à moi.',
            "Je m'assied sur un dabouret",
            'regarde cet homme devant toi',
            'Tourne à gauche',
            'respecte tes aînés',
            "L'homme travail dur pour gagner son pain",
            'Tourne à droite',
          ],
          language: 'Fongbe',
        });
      }, 3000);
    });
    return await result;
  },
  AuthSignin: async function (setdada) {
    const result = await new Promise(resolve => {
      setTimeout(() => {
        resolve({
          saved: 5,
          checked: 15,
          rejected: 20,
          earned: 30,
          name: 'Mathildda Martica',
        });
      }, 3000);
    });
    return await result;
  },
  CheckAuth: async function (setdada, tk) {
    const result = await new Promise(resolve => {
      setTimeout(() => {
        resolve({
          saved: 5,
          checked: 15,
          rejected: 20,
          earned: 30,
        });
      }, 3000);
    });
    return await result;
  },
  GetUserData: async function (setdada) {
    const result = await new Promise(resolve => {
      setTimeout(() => {
        resolve({
          saved: 5,
          checked: 15,
          rejected: 20,
          earned: 30,
          name: 'Mathildda Martica',
        });
      }, 3000);
    });
    return await result;
  },
  PutSection: async function (setdada) {
    let url = baseUrl + '/auth/users/authenticate';
    let res = await fetch(url, {
      method: 'POST',
      body: setdada,
      credentials: 'include',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return await res.json();
  },
};
export default Fetcher;
