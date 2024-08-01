import axios from 'axios'

const url = "http://localhost:3000/api/v1/subject"

export const saveSubject = async (subjectDetails) => {
    try {
        const res = await axios.post(`${url}/addSubject` , subjectDetails)
        return res;
    } catch (error) {
        
    }
}


export const getSubjects = async () => {
    try {
        const res = await axios.get(`${url}/getSubjects`)
        return res;
    } catch (error) {
        
    }
}

export const saveNote = async (noteDetails) => {
    try {
        console.log("i m not calling")
        const res = await axios.post(`${url}/saveNote` , noteDetails)
        return res;
    } catch (error) {
        
    }
}

export const getNotes = async () => {
    try {
        const res = await axios.get(`${url}/getNotes`)
        return res;
    } catch (error) {
        
    }
}
