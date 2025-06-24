# icons components generate script guidelines

## Config Variables

- figma file key: rghzt6WHC6NtQwFeibnbRo
- icons root node id: 55594:2485
- icons output directory: src/components/mdui/icons
- figma token: ...

## Tasks
-1 get icons node data from figma file
| https://api.figma.com/v1/files/file_key/nodes?ids={icons_root_node_id}

-2 get icon svg urls based on icons node data and map to icons node data
| https://api.figma.com/v1/images/file_key?ids={icon_node_ids}&format=svg
| sample response: {"images": {"55594:2485": url}}

-3 download icon svg files based on icon svg urls
| tmp save svg files to tmp directory, named by icon node id.

-4 generate icons components based on icons node data and icon svg files
| named by icon node name
| clear svg file content, replace fill color with current color
| save to icons output directory
