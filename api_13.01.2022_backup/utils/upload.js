const multer = require('multer');
const path = require('path');

// CONTRACTOR IMAGES  
var ContractorProfileStorage = multer.diskStorage({
    destination: "public/image/contractor/",
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})
exports.Contractor_Profile = multer({
    storage: ContractorProfileStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
}).single("image");

// FORUM IMAGES   
var ForumStorage = multer.diskStorage({
    destination: "public/image/forum/",
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})
exports.Forum_Image = multer({
    storage: ForumStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
}).single("image");

// User PROFILE IMAGE
var UserProfileStorage = multer.diskStorage({
    destination: "public/uploads/user/profile/",
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})
exports.upload_Profile_image = multer({
    storage: UserProfileStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
}).single("image");


// Tenant Image Done
var TenantStorage = multer.diskStorage({
    destination: "public/image/tenant/",
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
})
exports.Tenant_Profile = multer({
    storage: TenantStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
}).array('image')

var PropertyStorage = multer.diskStorage({
    destination: "public/image/landlord/property/",
    filename: function (req, file, cb) {
        // cb(null, file.fieldname + '-' + Date.now() + path.extname(originalname));
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    }
})

exports.Property_Image = multer({
    storage: PropertyStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
}).fields([
        {name: 'gallery', maxCount: 5},
        {name: 'profile', maxCount: 1},
        {name: 'images', maxCount: 5}, // for property
    ]
)

// Comapany LOGO Done
var CompanyStorage = multer.diskStorage({
    destination: "public/image/landlord/company/",
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

exports.Compnay_Logo = multer({
    storage: CompanyStorage,
    limits: {
        fileSize: 1024 * 1024 * 3
    }
}).single('image');


var InvesterProfileStorage = multer.diskStorage({
    destination: "public/image/invester/",
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

exports.Invester_Profile = multer({
    storage: InvesterProfileStorage,
    limits: {
        fileSize: 1024 * 1024 * 3
    }
}).single("image");

// NEWSFEED IMAGE
var NewsfeedStorage = multer.diskStorage({
    destination: "public/uploads/user/newsfeed/",
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
exports.newsfeed_image = multer({
    storage: NewsfeedStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
}).single("image");

/**
 * @exports uploadToServer
 * used as a middleware to upload the file
 */
exports.uploadToServer = multer({
    storage: multer.diskStorage({
        destination: 'public/uploads/docs/',
        filename: (req, file, cb) => {
            cb(null, req.body.doc_name + path.extname(file.originalname));
        }
    })
}).single('file');


/**
 * @exports updateUserDocument
 * used as a middleware to upload the file
 */
exports.updateUserDocument = multer({
    storage: multer.diskStorage({
        destination: 'public/uploads/user/',
        filename: (req, file, cb) => {
            cb(null, req.body.file_name + '_' + Date.now() + path.extname(file.originalname));
        }
    })
}).single('file');

