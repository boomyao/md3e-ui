import { Avatar, AvatarFallback, AvatarImage } from '@/components/mdui/avatar';
import {
  Card,
  CardHeader,
  CardHeaderContent,
  CardHeaderText,
  CardMedia,
  CardContent,
  CardActions,
} from '@/components/mdui/card';
import { Button } from '@/components/mdui/button';
import { IconButton } from '@/components/mdui/icon-button';
import { MoreVertIcon } from '@/components/mdui/icons';

export function CardDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardHeaderContent>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <CardHeaderText>
              <p className="title-medium">Header</p>
              <p className="body-medium text-on-surface-variant">Subhead</p>
            </CardHeaderText>
          </CardHeaderContent>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </CardHeader>
        <CardMedia>
          <img
            src="https://via.placeholder.com/360x188"
            alt="media"
            className="w-full h-full object-cover"
          />
        </CardMedia>
        <CardContent>
          <div>
            <p className="title-large">Title</p>
            <p className="body-medium text-on-surface-variant">Subhead</p>
          </div>
          <p className="body-medium text-on-surface-variant">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <CardActions>
            <Button variant="outlined">Enabled</Button>
            <Button>Enabled</Button>
          </CardActions>
        </CardContent>
      </Card>

      <Card layout="horizontal">
        <CardMedia>
          <img
            src="https://via.placeholder.com/128x128"
            alt="media"
            className="w-full h-full object-cover"
          />
        </CardMedia>
        <CardContent>
          <div>
            <p className="title-large">Title</p>
            <p className="body-medium text-on-surface-variant">Subhead</p>
          </div>
          <CardActions>
            <Button variant="outlined">Enabled</Button>
            <Button>Enabled</Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
}