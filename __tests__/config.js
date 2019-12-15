// From https://stackoverflow.com/a/56482581/3188334
// Ensures that UTC is used during tests to avoid flakiness

module.exports = async (): Void => {
    process.env.TZ = 'UTC'
}
