const url = "http://165.22.55.164:3000/api";

function getAccessToken() {
    return localStorage.getItem("accessToken");
}

function putAccessToken(accessToken) {
    return localStorage.setItem("accessToken", accessToken);
}

function logout() {
  localStorage.clear()
  alert ("Anda telah Log Out")
}

async function register({ username, password }) {
    const response = await fetch(`${url}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

    const responseJson = await response.json();
    return responseJson;

}

async function login({ username, password }) {
    const response = await fetch(`${url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  
    const responseJson = await response.json();

    putAccessToken(responseJson?.data?.token);
    return responseJson?.data?.token;
  }

  async function fetchWithToken(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  // Pada fungsi addNote di utils/api.js

async function addNote({ title, body }) {
    try {
      const token = getAccessToken();
    
  
      if (!token) {
        throw new Error("Token tidak tersedia");
      }
  
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, body }),
      };
  
      const response = await fetchWithToken(`${url}/notes`, requestOptions);
      const responseJson = await response.json();
  
      if (response.status >= 200 && response.status < 300) {
        return responseJson;
      } else {
        throw new Error(responseJson?.msg || "Failed to add note");
      }
    } catch (error) {
      console.error("Error during addNote:", error.message);
      throw error;
    }
  }

  async function getNotes() {
    const response = await fetchWithToken(`${url}/notes`);
    const responseJson = await response.json();
  
    if (response.status >= 400) {
      return { error: true, code: response.status, data: null };
    }
  
    return { error: false, code: response.status, data: responseJson.data };
  }
  
  async function deleteNote(id) {
    const response = await fetchWithToken(`${url}/notes/${id}`, {
      method: "DELETE",
    });
  
    const responseJson = await response.json();
  
    if (response.status >= 400) {
      return { error: true, code: response.status, data: null };
    }
  
    return { error: false, code: response.status, data: responseJson.data };
  }

export { login, register, getAccessToken, putAccessToken, logout, addNote, deleteNote, getNotes };
