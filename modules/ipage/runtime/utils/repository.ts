import type {PageData} from "#ipage/types/pages";

const baseUrl = '/ipage/v1'

export const ipagePagesRepository = {
  async show (slug: string): Promise<{ data: PageData }>
  {
    const {$authApiFetch} = useNuxtApp()
    return $authApiFetch<{ data: PageData }>(`${baseUrl}/pages/${slug}`, {
      method: 'GET',
      params: {filter: {field: 'slug'}, include: 'translations'}
    })
  },
}
