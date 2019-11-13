import kdbxweb from 'kdbxweb'
import argon2 from 'argon2-browser'

kdbxweb.CryptoEngine.argon2 = async (password, salt, memory, iterations, length, parallelism, type, version) => {
    const hash = await argon2.hash({
        pass: new Uint8Array(password),
        salt: new Uint8Array(salt),
        mem: memory,
        time: iterations,
        hashLen: length,
        parallelism
    })

    return hash.hash
}

const createVault = async (password: string, seed: string) => {
    const credentials = new kdbxweb.Credentials(kdbxweb.ProtectedValue.fromString(password), null)
    const db = kdbxweb.Kdbx.create(credentials, 'Trinity')

    db.upgrade()

    const entry = db.createEntry(db.getDefaultGroup())
    entry.fields.Title = 'Spark wallet seed'
    entry.fields.Seed = kdbxweb.ProtectedValue.fromString(seed)

    const chunk = await db.save()

    const blob = new Blob([chunk])
    const fileName = `vault.kdbx`

    if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, fileName)
    } else {
        const link = document.createElement('a')
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob)
            link.setAttribute('href', url)
            link.setAttribute('download', fileName)
            link.style.visibility = 'hidden'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }
}

export default createVault
