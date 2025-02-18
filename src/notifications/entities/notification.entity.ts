import { PrimaryGeneratedColumn } from "typeorm";

export class Notification {

    //uuid
    @PrimaryGeneratedColumn('uuid')
    id: string
    //user_id
    //content
    //is_read
    //created_at
}
