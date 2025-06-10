const BASE_URL = 'https://notes-api.dicoding.dev/v1'

function getAccessToken(): string | null {
    return localStorage.getItem('accessToken')
}

function putAccessToken(accessToken: string): void {
    localStorage.setItem('accessToken', accessToken)
}

async function fetchWithToken(url: string, options: RequestInit = {}): Promise<Response> {
    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${getAccessToken()}`,
        },
    })
}

interface LoginPayload {
    email: string
    password: string
}

interface RegisterPayload {
    name: string
    email: string
    password: string
}

interface NotePayload {
    title: string
    body: string
}

interface ApiResponse<T> {
    status: string
    message?: string
    data?: T
}

async function login({ email, password }: LoginPayload): Promise<{ error: boolean; data: any | null }> {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })

    const responseJson: ApiResponse<any> = await response.json()

    if (responseJson.status !== 'success') {
        alert(responseJson.message || 'Login failed')
        return { error: true, data: null }
    }

    return { error: false, data: responseJson.data! }
}

async function register({ name, email, password }: RegisterPayload): Promise<{ error: boolean }> {
    const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    })

    const responseJson: ApiResponse<null> = await response.json()

    if (responseJson.status !== 'success') {
        alert(responseJson.message || 'Register failed')
        return { error: true }
    }

    return { error: false }
}

async function getUserLogged(): Promise<{ error: boolean; data: any | null }> {
    const response = await fetchWithToken(`${BASE_URL}/users/me`)
    const responseJson: ApiResponse<any> = await response.json()

    if (responseJson.status !== 'success') {
        return { error: true, data: null }
    }

    return { error: false, data: responseJson.data! }
}

async function addNote({ title, body }: NotePayload): Promise<{ error: boolean; data: any | null }> {
    const response = await fetchWithToken(`${BASE_URL}/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
    })

    const responseJson: ApiResponse<any> = await response.json()

    if (responseJson.status !== 'success') {
        return { error: true, data: null }
    }

    return { error: false, data: responseJson.data! }
}

async function getActiveNotes(): Promise<{ error: boolean; data: any[] | null }> {
    const response = await fetchWithToken(`${BASE_URL}/notes`)
    const responseJson: ApiResponse<any[]> = await response.json()

    if (responseJson.status !== 'success') {
        return { error: true, data: null }
    }

    return { error: false, data: responseJson.data! }
}

async function getArchivedNotes(): Promise<{ error: boolean; data: any[] | null }> {
    const response = await fetchWithToken(`${BASE_URL}/notes/archived`)
    const responseJson: ApiResponse<any[]> = await response.json()

    if (responseJson.status !== 'success') {
        return { error: true, data: null }
    }

    return { error: false, data: responseJson.data! }
}

async function getNote(id: string): Promise<{ error: boolean; data: any | null }> {
    const response = await fetchWithToken(`${BASE_URL}/notes/${id}`)
    const responseJson: ApiResponse<any> = await response.json()

    if (responseJson.status !== 'success') {
        return { error: true, data: null }
    }

    return { error: false, data: responseJson.data! }
}

async function archiveNote(id: string): Promise<{ error: boolean; data: any | null }> {
    const response = await fetchWithToken(`${BASE_URL}/notes/${id}/archive`, {
        method: 'POST',
    })

    const responseJson: ApiResponse<any> = await response.json()

    if (responseJson.status !== 'success') {
        return { error: true, data: null }
    }

    return { error: false, data: responseJson.data! }
}

async function unarchiveNote(id: string): Promise<{ error: boolean; data: any | null }> {
    const response = await fetchWithToken(`${BASE_URL}/notes/${id}/unarchive`, {
        method: 'POST',
    })

    const responseJson: ApiResponse<any> = await response.json()

    if (responseJson.status !== 'success') {
        return { error: true, data: null }
    }

    return { error: false, data: responseJson.data! }
}

async function deleteNote(id: string): Promise<{ error: boolean; data: any | null }> {
    const response = await fetchWithToken(`${BASE_URL}/notes/${id}`, {
        method: 'DELETE',
    })

    const responseJson: ApiResponse<any> = await response.json()

    if (responseJson.status !== 'success') {
        return { error: true, data: null }
    }

    return { error: false, data: responseJson.data! }
}

export {
    getAccessToken,
    putAccessToken,
    login,
    register,
    getUserLogged,
    addNote,
    getActiveNotes,
    getArchivedNotes,
    getNote,
    archiveNote,
    unarchiveNote,
    deleteNote,
}

