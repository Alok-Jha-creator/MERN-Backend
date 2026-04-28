class FrontController {

    getHome = (req, res, next) => {
        res.json({ success: true, message: "hello world", status: 200 });
    }

    getAboutUs = (req, res, next) => {
        const data = {
            name: "express",
            slider: [
                { id: 1, title: "banner One", img: "https://placehold.co/600x400", link: "#" },
                { id: 2, title: "banner Two", img: "https://placehold.co/600x400", link: "#" },
                { id: 3, title: "banner Three", img: "https://placehold.co/600x400", link: "#" },
                { id: 4, title: "banner Four", img: "https://placehold.co/600x400", link: "#" },
            ],
        };
        res.json({ success: true, data: data, message: "data fetched successfully", status: 200 });
    }
}
const frontCtrl = new FrontController();
module.exports = frontCtrl;