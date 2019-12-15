// From https://stackoverflow.com/a/56482581/3188334
// Ensures that UTC is used during tests to avoid flakiness

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = async () => {
    process.env.TZ = 'UTC'
}
