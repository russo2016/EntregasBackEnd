import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const {name} = req.body;
        let destinationFolder;
        switch (name) {
            case "Identification":
                destinationFolder = 'src/public/uploads/identifications';
                break;
            case "Comprobante de domicilio":
                destinationFolder = 'src/public/uploads/addressProofs';
                break;
            case "Comprobante de estado de cuenta":
                destinationFolder = 'src/public/uploads/bankStatements';
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
            case "Identification":
                newFilename = `${uid}-${name}-${file.originalname}`;
                break;
            case "Comprobante de domicilio":
                newFilename = `${uid}-${name}-${file.originalname}`;
                break;
            case "Comprobante de estado de cuenta":
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