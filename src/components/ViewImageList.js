import React from 'react';
import { ImageList } from '@rmwc/image-list';
import { ElementImage } from './ElementImage';

export class ViewImageList extends React.Component {
    render() {
        return (
            <ImageList style={{margin: -2 }} withTextProtection>
                {this.props.sets.map((set, index) => {
                    const gbLaunch = (set.gbLaunch.includes('Q') ? set.gbLaunch : new Date(set.gbLaunch));
                    const gbEnd = new Date(set.gbEnd);
                    const icDate = new Date(set.icDate);
                    const today = new Date();
                    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    const nth = function(d) {
                        if (d > 3 && d < 21) return 'th';
                        switch (d % 10) {
                          case 1:  return "st";
                          case 2:  return "nd";
                          case 3:  return "rd";
                          default: return "th";
                        }
                      };
                    const title = set.profile + ' ' + set.colorway;
                    let subtitle;
                    if (set.gbLaunch && set.gbEnd) {
                        subtitle = gbLaunch.getDate() + nth(gbLaunch.getDate()) + '\xa0' + month[gbLaunch.getMonth()] + ' - ' + gbEnd.getDate() + nth(gbEnd.getDate()) + '\xa0' + month[gbEnd.getMonth()];
                    } else if (set.gbLaunch.includes('Q')) {
                        subtitle = 'Expected ' + gbLaunch;
                    } else if (set.gbLaunch) {
                        subtitle = gbLaunch.getDate() + nth(gbLaunch.getDate()) + '\xa0' + month[gbLaunch.getMonth()];
                    } else {
                        subtitle = 'IC ' + icDate.getDate() + nth(icDate.getDate()) + '\xa0' + month[icDate.getMonth()] + (icDate.getFullYear() !== today.getFullYear() ? ' ' + icDate.getFullYear() : '') ;
                    }
                    const thisWeek = (((gbEnd.getTime() - (7 * 24 * 60 * 60 * 1000)) < today.getTime()) && gbEnd.getTime() > today.getTime());
                    let live = false;
                    if (Object.prototype.toString.call(gbLaunch) === '[object Date]') {
                        live = (gbLaunch.getTime() < today.getTime() && gbEnd.getTime() > today.getTime());
                    }
                    return (
                        <ElementImage page={this.props.page} selected={(this.props.detailSet === set || this.props.editSet === set)} title={title} subtitle={subtitle} image={set.image} set={set} details={this.props.details} closeDetails={this.props.closeDetails} thisWeek={thisWeek} live={live} key={index}/>
                    )
                })}
            </ImageList>
        );
    }
}
export default ViewImageList;