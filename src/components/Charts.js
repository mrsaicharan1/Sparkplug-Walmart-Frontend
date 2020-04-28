import React, { Component } from 'react'
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    MarkSeries,
    VerticalBarSeries,
    Hint
  } from 'react-vis';
import '../styles/chart.css'
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie'
import animationData from '../lotties/18914-sand-clock-loader-animation.json'

const axios = require('axios');

const styles = theme => ({
    block: {
        display: "inline-block",
        zoom: 1,
        padding: "10px",
        margin: "10px",
        boxShadow: "5px 5px 8px #888888",
    } 
});

class Charts extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            size: 2,
            color: '#FF6347',
            value: false
        }
    }
    render() {
        const { classes } = this.props
        const defaultOptions = {
            animationData: animationData
        }
        return (
            <div>
                {this.props.loader ? 
                    <>
                        <div className="fake" ></div>
                        <div className="lottie">
                            <Lottie options={defaultOptions}
                                height={100}
                                width={100}
                                className="lottie-file"
                            />
                        </div>    
                    </>
                    : null
                }
                {this.props.submit ? 
                    <>
                        <div className="root">
                            <Card className={classes.block}>
                                <XYPlot width={600} height={300} 
                                    onMouseLeave={() => this.setState({value: false})}>
                                    <VerticalGridLines color="#808080" />
                                    <HorizontalGridLines />
                                    <XAxis/>
                                    <YAxis/>
                                    <MarkSeries
                                        className="mark-series-example"
                                        strokeWidth={2}
                                        opacity="0.8"
                                        sizeRange={[5, 15]}
                                        colorType="linear"
                                        data={this.props.data_outliers}
                                        size={this.state.size}
                                        color={this.state.color}
                                        onNearestXY={(value) => this.setState({value})}
                                        animation={true}
                                    />
                                    {this.state.value ? <Hint value={this.state.value} style={{color: 'white'}}>
                                                            <div className="details">
                                                                <h3 className="text">Price Gouging!</h3>
                                                                <p className="text">Retailer: {this.props.outliers[this.state.value.x]}</p>
                                                                <p className="text">Price: {this.state.value.y}</p>
                                                            </div>
                                                        </Hint> 
                                                    : 
                                                null
                                            }
                                </XYPlot>
                             </Card>
                            <Card className={classes.block}>
                                <XYPlot height={300} width={600}>
                                    <VerticalGridLines />
                                    <HorizontalGridLines />
                                    <XAxis />
                                    <YAxis />
                                    <MarkSeries data={this.props.data_raw} 
                                        className="mark-series-example"
                                        strokeWidth={2}
                                        opacity="0.8"
                                        sizeRange={[5, 15]}
                                        colorType="literal"
                                        size={2}
                                    />
                                </XYPlot>
                            </Card>
                        </div>
                        <div className="root">
                            <Card className={classes.block}>
                                <XYPlot height={400} width={700} xType="ordinal">
                                    <VerticalGridLines />
                                    <HorizontalGridLines />
                                    <XAxis />
                                    <YAxis />
                                    <VerticalBarSeries data={this.props.data_median} 
                                        className="mark-series-example"
                                        strokeWidth={2}
                                        opacity="0.8"
                                        sizeRange={[5, 20]}
                                        colorType="literal"
                                    />
                                </XYPlot>
                            </Card>
                        </div>
                    </> 
                : null}
            </div>
        )
    }
}

Charts.propTypes = {
    classes: PropTypes.object.isRequired
};
  
export default withStyles(styles)(Charts);
