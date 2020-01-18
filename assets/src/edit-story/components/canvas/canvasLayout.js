/**
 * External dependencies
 */
import styled, { css } from 'styled-components';

/**
 * Internal dependencies
 */
import { LEFT_NAV_WIDTH, PAGE_WIDTH, PAGE_HEIGHT, PAGE_NAV_BUTTON_WIDTH } from '../../constants';
import { useStory } from '../../app';
import useCanvas from './useCanvas';
import PageDisplay from './page';
import PageFrames from './pageFrames';
import PageEdit from './pageEdit';
import PageMenu from './pagemenu';
import PageNav from './pagenav';
import Carrousel from './carrousel';
import SelectionCanvas from './selectionCanvas';

// QQQQ: remove.
const DEBUG_ANGLE = 0;

const WorkspaceBackground = styled.div`
	background-color: ${ ( { theme } ) => theme.colors.bg.v1 };
	width: 100%;
	height: 100%;
	position: relative;
	user-select: none;

	${ DEBUG_ANGLE && ( `
		background-color: darkgray;
		backface-visibility: hidden;
		transform-style: preserve-3d;
		transform-origin: 50% 50%;
		transform: perspective(2500px) scale(0.4) rotateY(${ DEBUG_ANGLE }deg);
	` ) }
`;

const Layer = css`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
`;

// @todo: the menu and carousel heights are not correct until we make a var-size
// page.
const Layout = css`
	display: grid;
	grid:
    ".    .      . .          . .        ." 1fr
    ".    prev   . page       . next     ." ${ PAGE_HEIGHT }px
    ".    .      . menu       . .        ." 48px
    ".    .      . .          . .        ." 1fr
    ".    carrousel      carrousel carrousel  carrousel carrousel        ." 60px
    / 1fr ${ LEFT_NAV_WIDTH }px ${ PAGE_NAV_BUTTON_WIDTH }px ${ PAGE_WIDTH }px ${ PAGE_NAV_BUTTON_WIDTH }px ${ LEFT_NAV_WIDTH }px 1fr;
`;

const Canvas = css`
	position: relative;
	width: 100%;
	height: 100%;
`;

const DisplayLayer = styled.div`
	${ Layer }
	${ Layout }

	${ DEBUG_ANGLE && ( `
		background-color: rgba(0, 255, 0, 0.2);
		transform: translateZ(200px);
	` ) }
`;

const DisplayCanvas = styled.div`
	${ Canvas }
	grid-area: page;

	${ DEBUG_ANGLE && ( `
		background-color: rgba(255, 255, 255, 0.2);
	` ) }
`;

const NavLayer = styled.div`
	${ Layer }
	${ Layout }
	pointer-events: none;

	${ DEBUG_ANGLE && ( `
		background-color: rgba(0, 0, 255, 0.2);
		transform: translateZ(400px);
	` ) }
`;

const NavArea = styled.div`
	background-color: ${ ( { theme } ) => theme.colors.bg.v1 };
	grid-area: ${ ( { area } ) => area };
	height: 100%;
	width: 100%;
	pointer-events: initial;

	${ DEBUG_ANGLE && ( `
		background-color: rgba(0, 0, 255, 0.4);
		transform: translateZ(400px);
	` ) }
`;

const FramesAndSelectionLayer = styled.div`
	${ Layer }
	${ Layout }
	pointer-events: none;

	${ DEBUG_ANGLE && ( `
		background-color: rgba(0, 255, 255, 0.2);
		transform: translateZ(600px);
	` ) }
`;

const Overlay = css`
	position: absolute;
	top: 0;
	left: 0;
	width: 0;
	height: 0;

	${ DEBUG_ANGLE && ( `
		width: 100px;
		height: 100px;
	` ) }
`;

const FramesOverlay = styled.div`
	${ Overlay }

	${ DEBUG_ANGLE && ( `
		background-color: rgba(255, 0, 255, 0.2);
	` ) }
`;

const SelectionOverlay = styled.div`
	${ Overlay }

	${ DEBUG_ANGLE && ( `
		top: 20px;
		left: 20px;
		background-color: rgba(255, 255, 0, 0.2);
	` ) }
`;

// QQQQ: only show graypane for few element types.
const EditLayer = styled.div`
	${ Layer }
	${ Layout }
	pointer-events: none;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 1;

	${ DEBUG_ANGLE && ( `
		background-color: rgba(255, 140, 50, 0.2);
		transform: translateZ(800px);
	` ) }
`;

function CanvasLayout() {
	const {
		state: { currentPage },
	} = useStory();
	const {
		state: { editingElement: editingElementId },
	} = useCanvas();
	// eslint-disable-next-line @wordpress/no-unused-vars-before-return
	const editingElement =
    editingElementId &&
    currentPage &&
    currentPage.elements.find( ( element ) => element.id === editingElementId );

	return (
		<WorkspaceBackground>
			<SelectionCanvas>
				<DisplayLayer>
					<DisplayCanvas>
						<PageDisplay />
					</DisplayCanvas>
				</DisplayLayer>
				<NavLayer onMouseDown={ ( evt ) => evt.stopPropagation() }>
					<NavArea area="menu">
						<PageMenu />
					</NavArea>
					{ /* QQQ: buttons are too big. especially given the pointerEvents
					<NavArea area="prev">
						<PageNav isNext={ false } />
					</NavArea>
					<NavArea area="next">
						<PageNav />
					</NavArea>
					 */ }
					<NavArea area="carrousel">
						<Carrousel />
					</NavArea>
				</NavLayer>
				<FramesAndSelectionLayer>
					<DisplayCanvas>
						<FramesOverlay>
							<PageFrames />
						</FramesOverlay>
						<SelectionOverlay>
							{ /* QQQ: remove */ }
						</SelectionOverlay>
					</DisplayCanvas>
				</FramesAndSelectionLayer>
			</SelectionCanvas>
			{ ( editingElement || DEBUG_ANGLE ) && (
				<EditLayer>
					<DisplayCanvas>
						<PageEdit element={ editingElement } />
					</DisplayCanvas>
				</EditLayer>
			) }
		</WorkspaceBackground>
	);
}

export default CanvasLayout;
