import { List, ListItem } from "@/components/mdui/lists"
import { MailIcon, ChevronRightIcon, UserIcon } from "lucide-react"
import { Switch } from "@/components/mdui/switch"

export default function ListsDemo() {
  return (
    <div className="p-4 w-80">
      <List>
        <ListItem 
          headline="邮件标题"
          supportingText="邮件预览内容..."
          leadingElement={<MailIcon />}
          trailingElement={<ChevronRightIcon />}
          selected={true}
        />
        <ListItem 
          as="a" 
          href="/profile"
          headline="个人资料"
          leadingElement={<UserIcon />}
        />
        <ListItem 
          headline="three lines of text"
          supportingText="three lines of text, three lines of text, three lines of text, three lines of text"
          leadingElement={<Switch />}
        />
      </List>
    </div>
  )
}