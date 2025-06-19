"use client"

import * as React from "react"
import { Button } from "@/components/mdui/button"
import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuCheckboxItem,
  MenuRadioItem,
  MenuLabel,
  MenuSeparator,
  MenuShortcut,
  MenuGroup,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuRadioGroup,
} from "@/components/mdui/menu"
import { 
  Settings, 
  User, 
  LogOut, 
  Mail, 
  MessageSquare, 
  Phone,
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  Plus,
  PlusCircle,
  UserPlus,
  Users
} from "lucide-react"

export default function MenuDemo() {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true)
  const [urlsChecked, setUrlsChecked] = React.useState(false)
  const [person, setPerson] = React.useState("pedro")

  return (
    <div className="p-8 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-on-surface">Menu 演示</h2>
        <p className="text-on-surface-variant">展示各种菜单组件的使用方法</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* 基本菜单 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-on-surface">基本菜单</h3>
          <Menu>
            <MenuTrigger asChild>
              <Button variant="outline">打开菜单</Button>
            </MenuTrigger>
            <MenuContent className="w-56">
              <MenuLabel>我的账户</MenuLabel>
              <MenuSeparator />
              <MenuGroup>
                <MenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>个人资料</span>
                  <MenuShortcut>⇧⌘P</MenuShortcut>
                </MenuItem>
                <MenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>账单</span>
                  <MenuShortcut>⌘B</MenuShortcut>
                </MenuItem>
                <MenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>设置</span>
                  <MenuShortcut>⌘S</MenuShortcut>
                </MenuItem>
                <MenuItem>
                  <Keyboard className="mr-2 h-4 w-4" />
                  <span>键盘快捷键</span>
                  <MenuShortcut>⌘K</MenuShortcut>
                </MenuItem>
              </MenuGroup>
              <MenuSeparator />
              <MenuItem>
                <Github className="mr-2 h-4 w-4" />
                <span>GitHub</span>
              </MenuItem>
              <MenuItem>
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>支持</span>
              </MenuItem>
              <MenuItem disabled>
                <Cloud className="mr-2 h-4 w-4" />
                <span>API</span>
              </MenuItem>
              <MenuSeparator />
              <MenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>退出登录</span>
                <MenuShortcut>⇧⌘Q</MenuShortcut>
              </MenuItem>
            </MenuContent>
          </Menu>
        </div>

        {/* 复选框菜单 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-on-surface">复选框菜单</h3>
          <Menu>
            <MenuTrigger asChild>
              <Button variant="outline">显示选项</Button>
            </MenuTrigger>
            <MenuContent className="w-56">
              <MenuLabel>外观</MenuLabel>
              <MenuSeparator />
              <MenuCheckboxItem
                checked={bookmarksChecked}
                onCheckedChange={setBookmarksChecked}
              >
                显示书签栏
              </MenuCheckboxItem>
              <MenuCheckboxItem
                checked={urlsChecked}
                onCheckedChange={setUrlsChecked}
              >
                显示完整 URL
              </MenuCheckboxItem>
              <MenuSeparator />
              <MenuLabel>视图</MenuLabel>
              <MenuSeparator />
              <MenuCheckboxItem checked>
                侧边栏
              </MenuCheckboxItem>
              <MenuCheckboxItem disabled>
                状态栏
              </MenuCheckboxItem>
            </MenuContent>
          </Menu>
        </div>

        {/* 单选菜单 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-on-surface">单选菜单</h3>
          <Menu>
            <MenuTrigger asChild>
              <Button variant="outline">选择人员</Button>
            </MenuTrigger>
            <MenuContent className="w-56">
              <MenuLabel>人员</MenuLabel>
              <MenuSeparator />
              <MenuRadioGroup value={person} onValueChange={setPerson}>
                <MenuRadioItem value="pedro">Pedro Duarte</MenuRadioItem>
                <MenuRadioItem value="colm">Colm Tuite</MenuRadioItem>
                <MenuRadioItem value="alice">Alice Johnson</MenuRadioItem>
                <MenuRadioItem value="bob">Bob Smith</MenuRadioItem>
              </MenuRadioGroup>
            </MenuContent>
          </Menu>
        </div>

        {/* 子菜单 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-on-surface">子菜单</h3>
          <Menu>
            <MenuTrigger asChild>
              <Button variant="outline">更多选项</Button>
            </MenuTrigger>
            <MenuContent className="w-56">
              <MenuItem>
                <Mail className="mr-2 h-4 w-4" />
                <span>邮件</span>
              </MenuItem>
              <MenuItem>
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>消息</span>
              </MenuItem>
              <MenuSeparator />
              <MenuSub>
                <MenuSubTrigger>
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>邀请用户</span>
                </MenuSubTrigger>
                <MenuSubContent className="w-48">
                  <MenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    <span>邮件</span>
                  </MenuItem>
                  <MenuItem>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>消息</span>
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>更多...</span>
                  </MenuItem>
                </MenuSubContent>
              </MenuSub>
              <MenuSub>
                <MenuSubTrigger>
                  <Plus className="mr-2 h-4 w-4" />
                  <span>新建团队</span>
                </MenuSubTrigger>
                <MenuSubContent className="w-48">
                  <MenuItem>
                    <Users className="mr-2 h-4 w-4" />
                    <span>开发团队</span>
                  </MenuItem>
                  <MenuItem>
                    <Users className="mr-2 h-4 w-4" />
                    <span>设计团队</span>
                  </MenuItem>
                  <MenuItem>
                    <Users className="mr-2 h-4 w-4" />
                    <span>产品团队</span>
                  </MenuItem>
                </MenuSubContent>
              </MenuSub>
              <MenuSeparator />
              <MenuItem>
                <Phone className="mr-2 h-4 w-4" />
                <span>联系支持</span>
              </MenuItem>
            </MenuContent>
          </Menu>
        </div>

        {/* 带图标的菜单 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-on-surface">带图标菜单</h3>
          <Menu>
            <MenuTrigger asChild>
              <Button variant="filled">操作</Button>
            </MenuTrigger>
            <MenuContent className="w-56">
              <MenuItem>
                <Plus className="mr-2 h-4 w-4" />
                <span>新建</span>
              </MenuItem>
              <MenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>编辑</span>
              </MenuItem>
              <MenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>删除</span>
              </MenuItem>
            </MenuContent>
          </Menu>
        </div>

        {/* 最小菜单 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-on-surface">简单菜单</h3>
          <Menu>
            <MenuTrigger asChild>
              <Button variant="tonal">简单菜单</Button>
            </MenuTrigger>
            <MenuContent>
              <MenuItem>复制</MenuItem>
              <MenuItem>粘贴</MenuItem>
              <MenuItem>删除</MenuItem>
            </MenuContent>
          </Menu>
        </div>
      </div>

      <div className="mt-8 p-4 bg-surface-container rounded-lg">
        <h4 className="font-semibold text-on-surface mb-2">当前状态</h4>
        <p className="text-sm text-on-surface-variant">
          书签栏: {bookmarksChecked ? '显示' : '隐藏'} | 
          完整 URL: {urlsChecked ? '显示' : '隐藏'} | 
          选择的人员: {person}
        </p>
      </div>
    </div>
  )
}
