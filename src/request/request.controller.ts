import { Controller, Post, Req, Res } from '@nestjs/common';
import { pipeline } from 'stream';
import * as util from 'util';
import { FastifyReply, FastifyRequest } from 'fastify';
import * as fs from 'fs';

const pump = util.promisify(pipeline);

@Controller('request')
export class RequestController {
  @Post('/create')
  async createRequest(@Req() req: FastifyRequest, @Res() reply: FastifyReply) {
    const data = await req.file();
    await pump(data.file, fs.createWriteStream(data.filename));
    
    if (data.file.truncated) {
      // you may need to delete the part of the file that has been saved on disk
      // before the `limits.fileSize` has been reached
      reply.send('Error occurred');
    }

    reply.status(200).send('Uploaded');
  }
}
