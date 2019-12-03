import argon2 from 'argon2-browser'
import * as FileSaver from 'file-saver'

const createVault = async (password: string, seed: string) => {
    const kdbxweb = await import('kdbxweb')

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

    const credentials = new kdbxweb.Credentials(kdbxweb.ProtectedValue.fromString(password), null)
    const db = kdbxweb.Kdbx.create(credentials, 'Trinity')

    db.upgrade()

    const entry = db.createEntry(db.getDefaultGroup())
    entry.fields.Title = 'Spark wallet seed'
    entry.fields.Seed = kdbxweb.ProtectedValue.fromString(seed)

    const chunk = await db.save()

    const blob = new Blob([chunk])

    FileSaver.saveAs(blob, 'spark-vault.kdbx')
}

export default createVault
