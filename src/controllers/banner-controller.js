
const { BannerService } = require('../services')

async function createBanner(req,res) {
    try {
        const data = req.body
        const imageUrl = req.file.path

        const bannerData = {
            ...data,
            url:imageUrl
        }

        const banner = await BannerService.createBanner(bannerData)
        
        return res.status(200).json({
            success: true,
            message: "Banner Created Successfully",
            banner: banner
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error in Banner Creation",
            error: error.message
        })
    }
}

async function getBanners(req,res) {
    try {
        const banners = await BannerService.getBanners()
        return res.status(200).json({
            success: true,
            message: "Banners Fetched Successfully",
            data: banners
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Errors in Banner Fetching",
            error: error.message
        })
    }
}

module.exports = {
    createBanner,
    getBanners
}