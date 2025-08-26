
const { BannerRepository } = require('../repositories')

const bannerRepository = new BannerRepository()

async function createBanner(data) {
    const banner = await bannerRepository.create(data)
    return banner
}

async function getBanners() {
    const banners = await bannerRepository.getAll()
    return banners
}

module.exports = {
    createBanner,
    getBanners
}