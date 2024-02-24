import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';
import { Review } from 'src/schemas/review.schema';

@Controller('reviews')
@ApiTags('Review')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(JwtGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOkResponse({ type: Review })
  create(@Body() createReviewDto: CreateReviewDto, @Req() req: Express.Request) {
    const { userId } = req.user;

    return this.reviewsService.create(createReviewDto, userId);
  }

  @Get()
  @ApiOkResponse({ type: Review })
  findAll(@Query() query: any) {
    return this.reviewsService.findAll(query);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Review })
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Review })
  remove(@Param('id') id: string, @Req() req: Express.Request) {
    const { userId } = req.user;
    return this.reviewsService.remove(id, userId);
  }
}
