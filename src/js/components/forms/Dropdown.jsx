/**
 * Created by cmeyers on 11/2/16.
 */
import React, { PropTypes } from 'react';
import debounce from 'lodash.debounce';

import FloatingElement from '../FloatingElement';
import KeyCodes from '../../KeyCodes';

const POSITION = {
    FIRST: 'first',
    PREV: 'prev',
    NEXT: 'next',
    LAST: 'last',

    values: () => {
        return [POSITION.FIRST, POSITION.PREV, POSITION.NEXT, POSITION.LAST];
    }
};

export default class Dropdown extends React.Component {

    constructor(props) {
        super(props);

        this.dropdownRef = null;
        this.buttonRef = null;
        this.menuRef = null;
        this.lastScrollTop = 0;

        this.state = {
            menuOpen: false,
            selectedOption: null,
        };
    }

    componentWillMount() {
        this._defaultSelection(this.props);
    }

    componentDidMount() {
        document.addEventListener('keydown', this._handleKeyEvent);
        document.addEventListener('mousedown', this._handleMouseEvent);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.menuOpen && !prevState.menuOpen) {
            this._setInitialFocus();
        }
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this._handleKeyEvent);
        document.removeEventListener('mousedown', this._handleMouseEvent);
    }

    get selectedOption() {
        return this.state.selectedOption;
    }

    _defaultSelection(props) {
        if (!this.state.selectedOption && props.defaultOption) {
            this.setState({
                selectedOption: props.defaultOption,
            });
        }
    }

    _toggleDropdownMenu() {
        if (this.state.menuOpen) {
            this._closeDropdownMenu();
        } else {
            this._openDropdownMenu();
        }
    }

    _openDropdownMenu() {
        this.setState({
            menuOpen: true,
        });
    }

    _closeDropdownMenu() {
        this.setState({
            menuOpen: false,
        });
    }

    _onDropdownKeyEvent = (event) => {
        console.log('_onDropdownKeyEvent');
        if (event.keyCode === KeyCodes.SPACEBAR) {
            this._toggleDropdownMenu();
            // prevent the onClick handler from being triggered automatically
            event.preventDefault();
        }
    };

    _onDropdownMouseEvent = () => {
        console.log('_onDropdownMouseEvent');
        this._toggleDropdownMenu();
    };

    _handleKeyEvent = (event) => {
        console.log('_handleKeyEvent', this.state.menuOpen);
        if (!this.state.menuOpen) {
            return;
        }

        const { keyCode } = event;

        switch (keyCode) {
            case KeyCodes.TAB:
                // tabbing while open will advance to the next element after this Dropdown
                this._closeDropdownMenu();
                break;
            case KeyCodes.ESC:
                this._closeDropdownMenu();
                break;
            // don't let arrow keys scroll the content; focus change will do that for us
            case KeyCodes.ARROW_DOWN:
                event.preventDefault();
                this._changeFocusPosition(POSITION.NEXT);
                break;
            case KeyCodes.ARROW_UP:
                event.preventDefault();
                this._changeFocusPosition(POSITION.PREV);
                break;
            // page/up down scrolls as normal but applies focus
            case KeyCodes.PAGE_DOWN:
            case KeyCodes.PAGE_UP:
                this._syncFocusAfterScroll();
                break;
            case KeyCodes.HOME:
                this._changeFocusPosition(POSITION.FIRST);
                break;
            case KeyCodes.END:
                this._changeFocusPosition(POSITION.LAST);
                break;
            case KeyCodes.SPACEBAR:
            case KeyCodes.ENTER:
                event.preventDefault();
                this._selectFocusedItem();
                break;
            default:
                break;
        }
    };

    _handleMouseEvent = (event) => {
        console.log("_handleMouseEvent");
        const { clientX, clientY } = event;

        if (this.state.menuOpen) {
            const element = document.elementFromPoint(clientX, clientY);

            if (!this.dropdownRef.contains(element)) {
                this._closeDropdownMenu();
            }
        }
    };

    _onMenuScrollEvent = () => {
        this._syncFocusAfterScroll();
    };

    _syncFocusAfterScroll = debounce(() => {
        if (this.menuRef.scrollTop === this.lastScrollTop) {
            return;
        }

        const scrollDown = this.menuRef.scrollTop > this.lastScrollTop;
        this.lastScrollTop = this.menuRef.scrollTop;
        const rect = this.menuRef.getBoundingClientRect();
        const nextFocusItem = scrollDown ?
            document.elementFromPoint(rect.left + 1, rect.top + rect.height - 2) :
            document.elementFromPoint(rect.left + 1, rect.top + 1);

        this._focusListItem(nextFocusItem.parentNode);
    }, 200);

    _setInitialFocus() {
        if (this.state.selectedOption) {
            const selectedIndex = this.props.options.indexOf(this.state.selectedOption);
            const selectedListItem = this.menuRef.children[selectedIndex];
            this._focusListItem(selectedListItem);
        } else {
            this._changeFocusPosition(POSITION.FIRST);
        }
    }

    _changeFocusPosition(position) {
        if (POSITION.values().indexOf(position) === -1) {
            return;
        }

        if (position === POSITION.FIRST || !this.menuRef.contains(document.activeElement)) {
            const listItem = this.menuRef.children[0];
            this._focusListItem(listItem);
            return;
        }

        const allListItems = [].slice.call(this.menuRef.children);

        if (position === POSITION.NEXT || position === POSITION.PREV) {
            const focusedListItem = document.activeElement.parentNode;
            const focusedIndex = allListItems.indexOf(focusedListItem);
            const nextFocusIndex = focusedIndex + (position === POSITION.NEXT ? 1 : -1);

            if (0 <= nextFocusIndex && (nextFocusIndex <= allListItems.length - 1)) {
                const nextListItem = allListItems[nextFocusIndex];
                this._focusListItem(nextListItem);
            }
        } else if (position === POSITION.LAST) {
            this._focusListItem(allListItems[allListItems.length - 1]);
        }
    }

    _focusListItem(listItemNode) {
        if (this.menuRef.contains(listItemNode)) {
            listItemNode.children[0].focus();

            const listItemRect = listItemNode.getBoundingClientRect();
            const menuRect = this.menuRef.getBoundingClientRect();

            // make the focused item "stick" to top or bottom edge
            if (listItemRect.top < menuRect.top) {
                this.menuRef.scrollTop = listItemNode.offsetTop;
            } else if (listItemRect.bottom > menuRect.bottom) {
                this.menuRef.scrollTop += listItemRect.bottom - menuRect.bottom;
            }
        }
    }

    /**
     * Updates the dropdown's state such that its selectedOption corresponds to the item which currently has focus.
     * @private
     */
    _selectFocusedItem() {
        if (this.menuRef.contains(document.activeElement)) {
            const allListItems = [].slice.call(this.menuRef.children);
            const focusedListItem = document.activeElement.parentNode;
            const focusedIndex = allListItems.indexOf(focusedListItem);

            const selectedOption = this.props.options[focusedIndex];
            this.setState({
                selectedOption,
            });

            this._closeDropdownMenu();
        }
    }

    _onMenuItemClick(option, index) {
        this.setState({
            selectedOption: option,
            menuOpen: false,
        });

        if (this.props.onChange) {
            this.props.onChange(option, index);
        }

        return false;
    }

    render() {
        console.log('render', this.state.menuOpen);
        const extraClass = this.props.className || '';
        const openClass = this.state.menuOpen ? 'Dropdown-menu-open' : 'Dropdown-menu-closed';
        const label = this.state.selectedOption || this.props.placeholder;

        return (
            <div ref={dropdown => { this.dropdownRef = dropdown; }}
                className={`Dropdown ${openClass} ${extraClass}`}>
                <button ref={button => { this.buttonRef = button; }}
                   className="Dropdown-button btn-secondary"
                   onClick={this._onDropdownMouseEvent}
                   onKeyUp={this._onDropdownKeyEvent}
                >
                    <div className="Dropdown-button-container">
                        <span className="Dropdown-button-label">{label}</span>
                        <img className="Dropdown-button-indicator" src="foo.png" />
                    </div>
                </button>

                { this.state.menuOpen &&
                <FloatingElement targetElement={this.buttonRef} positionFunction={positionMenu}>
                    <ul
                        ref={list => { this.menuRef = list; }}
                        className="Dropdown-menu"
                        onWheel={this._onMenuScrollEvent}
                    >
                        { this.props.options.map((option, index) => {
                            const selectedClass = this.state.selectedOption === option ? 'Dropdown-menu-item-selected' : '';
                            let labelValue = '';

                            if (this.props.labelField) {
                                labelValue = option[this.props.labelField];
                            } else if (this.props.labelFunction) {
                                labelValue = this.props.labelFunction(option);
                            } else {
                                labelValue = option.toString();
                            }

                            return (
                                <li key={index} data-position={index}>
                                    <a className={`Dropdown-menu-item ${selectedClass}`}
                                       href="#"
                                       onClick={() => this._onMenuItemClick(option, index)}
                                    >
                                        {labelValue}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </FloatingElement>
                }
            </div>
        );
    }

}

const BORDER_OFFSET:number = 1;

// eslint-disable-next-line max-len, no-unused-vars
function positionMenu(selfWidth:number, selfHeight:number, targetWidth:number, targetHeight:number, targetLeft:number, targetTop:number, viewportWidth:number, viewportHeight:number) {
    return {
        newLeft: targetLeft,
        newTop: targetTop + targetHeight - BORDER_OFFSET,
    };
}

Dropdown.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.array,
    defaultOption: PropTypes.string,
    labelField: PropTypes.string,
    labelFunction: PropTypes.func,
    onChange: PropTypes.func,
};

Dropdown.defaultProps = {
    placeholder: '-Select-',
};
