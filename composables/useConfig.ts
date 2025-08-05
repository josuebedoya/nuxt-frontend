import { ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'

// Function Breakpoints Tailwind
export function useBreakpoints() {
  const isSm = useMediaQuery('(min-width: 640px)')
  const isMd = useMediaQuery('(min-width: 768px)')
  const isLg = useMediaQuery('(min-width: 1024px)')
  const isXl = useMediaQuery('(min-width: 1280px)')
  const is2xl = useMediaQuery('(min-width: 1536px)')

  return { isSm, isMd, isLg, isXl, is2xl }
}

// Logos
export const logoColor = ref('https://components.ozonohosting.com/assets/media/logo-8-horizontal-letra-roja-negra-ready-rent-cars.png?u=1753882751')
export const logoWhite = ref('https://components.ozonohosting.com/assets/media/logo-10-horizontal-blanco-ready-rent-cars.png?u=1753915846')

// Images
export const image = ref('https://components.ozonohosting.com/assets/media/pexels-1266623.jpg?u=1700491876');

// Texts
export const textH1 = ref('Alquiler de Autos en Colombia con Tarifas Increíbles');
export const titlesCart = ref({ title: 'Gamas de Vehículos', subtitle:'Reserva el tuyo'});

// Vehiculos
export const cart = ref([
    {
        img: 'https://components.ozonohosting.com/assets/media/dsc-0002.jpg?u=1700491876',
        category: 'Gama IM',
        name: 'Kia picanto automático',
    }
])

// Info Alquiler
export const infoRent = ref(
    {
        img: 'https://components.ozonohosting.com/assets/media/pexels-1266623.jpg?u=1700491876',
        title: 'Requisitos de Alquiler',
        summary: 'Excelencia Profesional',
        customHtml: `
            <ol>
            <li>La edad mínima para el alquiler del vehículo debe ser de 25 años</li>
            <li>Licencia de conducción vigente. Nacional o Internacional</li>
            <li>Cédula de ciudadanía colombiana, cédula de extranjería o pasaporte</li>
            <li>
                Tarjeta de Crédito para avalar el depósito del vehículo, cupo mínimo de
                $2.000.000 para automóviles y gama premium tipo Nissan Versa $2.700.000
                entre $4.000.000 y $5.000.000 para camionetas.
            </li>
            <li>
                Nuestro equipo está capacitado y entrenado en servicio al cliente y
                habilidades blandas, lo cual nos permite ser un apoyo para su
                organización y sentirse a gusto con las personas que realizarán el trabajo.
            </li>
            <li>
                Recibimos tarjetas bajo Franquicia (Visa, MasterCard, American Express).
                No se reciben tarjetas de crédito virtuales, prepago, con CCV dinámico o
                sin información en el plástico. Tampoco Discovery; sólo tarjetas emitidas
                por bancos.
            </li>
            </ol>
        `,
        url:'/terminos-y-condiciones',
        caption:' Términos & Condiciones '
        
    }
)

export const phone = ref(['+57 311 8060834','+57 311 8060834'])

export const address = ref(['Calle 74 bis 83-45 · Aeropuerto El Dorado de Bogotá · servicio Meet & Greet'])

export const email = ref(['serviciocliente@readyrentacars.com'])


export const contactInfo = ref({
  phone: {
    value: ['+57 311 8060834','+57 311 8060834']
  },
  address: {
    value: ['Calle 74 bis 83-45 · Aeropuerto El Dorado de Bogotá · servicio Meet & Greet'],
  },
  email: {
    value: ['serviciocliente@readyrentacars.com'],
  }
})

export const social = ref([
    { icon: 'fa-brands fa-facebook-f', link: '#' },
    { icon: 'fa-brands fa-instagram', link: '#' }
])

// Menu Footer
export const menuFooter = ref([
  {
    title: 'Preguntas Frecuentes',
    url: '/preguntas-frecuentes',
    children: []
  },
    {
    title: 'Términos y Condiciones',
    url: '/terminos-y-condiciones',
    children: []
  },
    {
    title: 'Política de Privacidad',
    url: '/política-de-privacidad',
    children: []
  },
    {
    title: 'Contrato de Alquiler de Autos',
    url: '/contrato-de-alquiler-de-autos',
    children: []
  }
])

// Menu RenCart
export const menuItemsRC = ref([
    {
    title: 'Inicio',
    url: '/',
    children: []
  },
  {
    title: 'Vehículo',
    url: '/vehiculo',
    children: []
  },
  {
    title: 'Requisitos',
    url: '/requisitos',
    children: []
  },
    {
    title: 'Oficinas',
    url: '/oficinas',
    children: []
  },
    {
    title: 'Nosotros',
    url: '/Nosotros',
    children: []
  },
    {
    title: 'Contacto',
    url: '/contacto',
    children: []
  }
])

// Menu Prueba Items
export const menuItems = ref([
    {
    title: 'Hogar',
    url: '/categoria/hogar',
    icon: 'fa6-solid:tv',
    children: []
  },
  {
    title: 'Electrónica',
    url: '/categoria/electronica',
    icon: '',
    children: [
      {
        title: 'TVs',
        url: '/categoria/electronica/tvs',
        children: [
          { title: 'Smart TVs', url: '/categoria/electronica/tvs/smart' },
          { title: 'LED TVs',   url: '/categoria/electronica/tvs/led'   }
        ]
      },
      { title: 'Audio', url: '/categoria/electronica/audio' },
      { title: 'Audio', url: '/categoria/electronica/audio' },
      { title: 'Audio', url: '/categoria/electronica/audio' }
    ]
  },
  {
    title: 'Moda',
    url: '/categoria/moda',
    children: []
  }
])


