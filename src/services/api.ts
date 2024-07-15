import menu from '../resources/menu-challenge.json'

export interface Image {
  id: number
  itemId: number
  image: string
  position: number
  created: string
  updated: string
}

export interface Item {
  id: number
  externalId: string
  name: string
  internalName: string
  description: string
  deliveryFlag: number
  pickupFlag: number
  seatFlag: number
  price: number
  visible: number
  availabilityType: string
  sku: string
  created: string
  updated: string
  images?: Image[]
  availableForPublish: boolean
  available: boolean
}

// const API_URL = 'https://cdn-dev.preoday.com/senior-fe-menu-challenge.json'

export const fetchItems = async (
  page: number,
  pageSize: number = 20,
  query: string = '',
) => {
  // try {
  //   const response = await fetch(`${API_URL}/items?page=${page}&pageSize=${pageSize}`);
  //   if (!response.ok) {
  //     throw new Error('Erro ao buscar itens');
  //   }
  //   const data: Item[] = await response.json();
  //   return query
  //           ? data.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
  //           : data;

  // } catch (error) {
  const start = (page - 1) * pageSize
  const end = start + pageSize

  if (query) {
    const filteredItems = (menu as Item[]).filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    return filteredItems.slice(start, end);
  }

  return (menu as Item[]).slice(start, end);

  // }
}
