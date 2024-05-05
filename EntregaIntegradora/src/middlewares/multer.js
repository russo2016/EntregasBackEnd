import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const {name} = req.body;
        let destinationFolder;
        switch (name) {
            case "identification":
                destinationFolder = 'src/public/uploads/identifications';
                break;
            case "address":
                destinationFolder = 'src/public/uploads/address';
                break;
            case "status":
                destinationFolder = 'src/public/uploads/status';
                break;
            default:
                cb(new Error("Documento no válido"));
        }
        cb(null, destinationFolder);
    },
    filename: (req, file, cb) => {
        const { uid } = req.params;
        const { name } = req.body;
        let newFilename;
        switch (name) {
            case "identification":
                newFilename = `${uid}-${name}-${file.originalname}`;
                break;
            case "address":
                newFilename = `${uid}-${name}-${file.originalname}`;
                break;
            case "status":
                newFilename = `${uid}-${name}-${file.originalname}`;
                break;
            default:
                cb(new Error("Documento no válido"));
        }
        cb(null, newFilename);
    },
});

const uploader = multer({ storage });
export default uploader;