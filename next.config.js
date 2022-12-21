module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/busca',
        permanent: true,
      },
    ]
  },
}