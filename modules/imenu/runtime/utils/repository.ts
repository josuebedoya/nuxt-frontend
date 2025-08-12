import type {Menu} from "#imenu/types/menus";

const baseUrl = '/imenu/v1'

export const imenuMenusRepository = {
  async show (criteria: string, params = {}): Promise<{ data: Menu }>
  {
    const {$apiFetch} = useNuxtApp()
    return $apiFetch<{ data: Menu }>(
      `${baseUrl}/menus/${criteria}`, {method: 'GET', params})
  },
}
