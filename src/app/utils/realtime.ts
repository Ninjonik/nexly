import client from '@/app/appwrite'

const database = process.env.NEXT_PUBLIC_APPWRITE_DB_NAME
if(!database){
    return "<div>No database configured!</div>"
}

export const subscribeMessage = ($groupID: string) => {

    return false

}