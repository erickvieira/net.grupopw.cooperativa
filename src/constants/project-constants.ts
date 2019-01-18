export const BASE_URL = 'http://localhost:3000'
export const SITE_URL = 'grupow.net'
export const VERSION = '0.0.1'
export const PHONE_CONTACT = '(62) 9 9999-9999'

/**
 * @var default: Centro Geográfico de Goiânia
 */
export const AGM = {
  searchUrl: 'https://maps.googleapis.com/maps/api/geocode/json?address=',
  apiKey: 'AIzaSyAbSNctv1j8nBETR25EILcUYA2c-jnkdb0',
  libs: [
    'places',
  ],
  default: {
    coords: {
      lat: -16.6868824,
      lng: -49.26478849999999,
    },
    zoom: {
      unfocused: 13,
      focused: 15,
    },
  },
  styles: [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8ec3b9"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1a3646"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#64779e"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#334e87"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6f9ba5"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3C7680"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#304a7d"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2c6675"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#255763"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#b0d5ce"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3a4762"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#0e1626"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#4e6d70"
        }
      ]
    }
  ],
}

export const PATTERNS = {
  stringToRegExp: (pass) => {
    let result = ''
    pass.split('').forEach(char => result += `[${char}]`)
    return new RegExp(`^${result}$`)
  },
  PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*?\.\-\_\\\/]{8,}$/g,
  EMAIL: /^[\w\.-]*[a-zA-Z0-9_]@[\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/g,
  PHONE: /^[(][0-9]{2}[)]\s[9][0-9]{4}[-][0-9]{4}$/g,
  GENDER: /^([F]|[M]){1}$/g,
  WORD: /^([\w]*[\s])*$/,
};

export const FIREBASE_ERRORS = {
  'auth/email-already-in-use': 'Já existe uma conta associada a este e-mail. Por favor, tente novamente com outro endereço de e-mail.',
  'auth/invalid-email': 'O e-mail informado é inválido ou contem algum erro de digitação.',
  'auth/operation-not-allowed': 'Este método de cadastro está temporariamente indisponível. Por favor, tente novamente mais tarde.',
  'auth/weak-password': 'A senha digitada não é forte o suficiente. Recomendamos senhas com pelo menos 8 caracteres (letras, números), tendo, no mínimo, 1 letra maiúscula e sem caracteres especiais.'
}

export const StringTools = {
  replaceAll: (target: string, search: string, replacement: string) => {
    return target.replace(new RegExp(search, 'g'), replacement)
  },
  removeDoubleSpaces: (target: string) => {
    return target.replace(/\s\s+/g, ' ')
  },
  b64EncodeUnicode: (target) => {
    return btoa(encodeURIComponent(target).replace(/%([0-9A-F]{2})/g,
      (match, p1) => String.fromCharCode(parseInt(`0x${p1}`))
    ));
  },
  cutString: (target: string, max: number) => {
    if (target.length > max) return (`${target.substring(0, max)}...`)
	  return target
  }
}

export const JSONTools = {
    getCircularReplacer: () => {
    const seen = new WeakSet;
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  }
};
