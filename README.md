# Suprematism More Menu

An Angular 2 dropdown menu component.


#### Installation
```bash
npm i -S CINBCUniversal/suprematism-dropdown-menu
```
Until it is published to npm, point to github. A consequence of this is that
built files must be checked-in. When we publish to npm with `npm publish`,
there is a prehook to build the files and a posthook to delete them
(so only source files are saved in git). For now, after doing development,
we must manually run the publish prehook and save the files.


#### View
- [Hosted on Github Pages](https://cinbcuniversal.github.io/suprematism-dropdown-menu/)
- Run the example locally with `npm run example`


## Component

#### `supre-dropdown-menu`
A component for a dropdown menu.  This component provides the functionality for opening/closing and positioning a dropdown menu, but has no opinion on the content of the menu or the button/element that triggers it.


#### Options
- `trigger: string`: Either `click` or `hover`.  
- `align: Array<string>`: Position of the dropdown in relation to the triggering element.
Values include `top-right`, `top-middle`, `top-left`, `bottom-right`, `bottom-middle`, `bottom-left`, `right-top`, `right-middle`, `right-bottom`, `left-top`, `left-middle`,`left-bottom`. This option takes an array of positions.  Each supplied position will be tried in sequence until the dropdown fits on-screen.  If the dropdown does not fit onscreen for any of the specified positions it will be placed at the first specified position in the array.
- `pointed: boolean`: By default the menu has a pointer arrow.  This arrow can be removed by setting `[pointed]="false"`.

#### Trigger Element
The attribute `supre-dropdown-menu-button` should be added to one of the dropdown's child elements to make it the triggering element.  This element will not be included in the menu itself.

#### Content
The dropdown menu has built-in support for menu items (`class="item"`) and headers (`class="header"`), but can accept any content.

#### Closing the dropdown
Events triggered on child menu items can close the dropdown itself.  The `supre-dropdown-menu-close` attribute  specifies the type of event that will close the dropdown.  This can be applied to any element in the DOM hierarchy between the child and the parent dropdown.  It will control how events on children at or below that level in the DOM close the dropdown.  This gives flexibility to specify different events for different children.  
Supported values include:

- click (default): close the dropdown when a child is clicked
- change: close the dropdown when a child is changed
- none: do not close the dropdown on child interaction

#### Example
```
<supre-dropdown-menu trigger="hover" [align]="['bottom-right','top-right']">
  <button supre-dropdown-menu-button>Trigger</button>
  <div class="item"><span class="u-supre-icon u-supre-icon--snapshot"></span>Option One</div>
  <div class="item"><span class="u-supre-icon u-supre-icon--edit"></span>Option Two</div>
  <div class="item"><span class="u-supre-icon u-supre-icon--export"></span>Option Three</div>
  <div style="padding:5px" supre-dropdown-menu-close="change"><select><option>Change</option><option>Two</option><option>Three</option></select></div>
</supre-dropdown-menu>
```
