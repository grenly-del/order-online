import { Request } from "express";
import { File } from "multer";

declare global {
  namespace Express {
    interface Request {
      files?: File[] | { [fieldname: string]: File[] };
      newImage?: dataImageType;
    }
  }
}
